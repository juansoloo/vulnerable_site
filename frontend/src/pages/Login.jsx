import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login({ setUsername }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAuth = async () => {
    const endpoint = isRegistering ? "register" : "login";
    const { username, password } = form;

    if (!username.trim() || !password.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:5050/api/auth/${endpoint}`,
        { username, password },
        { withCredentials: true }
      );

      console.log("Full response:", res);
      console.log("Response data:", res.data);

      if (res.data.success) {
        if (!isRegistering) {
          localStorage.setItem("username", username);
          setUsername(username);
          console.log('Redirecting to login')
          navigate("/dashboard"); // Redirect after login
        } else {
          alert("Registration successful. You can now log in.");
          setIsRegistering(false);
          setForm({ username: "", password: "" });
        }
      } else {
        alert(res.data.message || "Authentication failed.");
      }
    } catch (err) {
      alert("Server error.");
      console.error(err);
    }
  };


  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto", textAlign: "center" }}>
      <h2>{isRegistering ? "Create an Account" : "Sign In"}</h2>
      <input
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        style={{ display: "block", width: "100%", marginBottom: "1rem" }}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        style={{ display: "block", width: "100%", marginBottom: "1rem" }}
      />
      <button onClick={handleAuth} style={{ marginRight: "1rem" }}>
        {isRegistering ? "Register" : "Login"}
      </button>
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? "Back to Login" : "Create Account"}
      </button>
    </div>
  );
}
