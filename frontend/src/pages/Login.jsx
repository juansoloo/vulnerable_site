import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login({ setUsername }) {
  const [username, setLocalUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerMode, setRegisterMode] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (username.trim() && password.trim()) {
      try {
        const res = await axios.post("http://localhost:5050/api/auth/login", {
          username,
          password,
        });
        if (res.data.success) {
          localStorage.setItem("username", username);
          setUsername(username);
          navigate("/");
        } else {
          alert("Invalid credentials");
        }
      } catch (err) {
        alert("Login failed");
      }
    }
  };

  const handleRegister = async () => {
    if (username.trim() && password.trim()) {
      try {
        const res = await axios.post("http://localhost:5050/api/auth/register", {
          username,
          password,
        });
        if (res.data.success) {
          alert("Registration successful! You can now log in.");
          setRegisterMode(false);
        } else {
          alert(res.data.message || "Registration failed");
        }
      } catch (err) {
        alert("Registration failed");
      }
    }
  };

  return (
    <div>
      <h1>{registerMode ? "Register" : "Sign In"}</h1>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setLocalUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {registerMode ? (
        <>
          <button onClick={handleRegister}>Register</button>
          <button onClick={() => setRegisterMode(false)}>Back to Login</button>
        </>
      ) : (
        <>
          <button onClick={handleLogin}>Sign In</button>
          <button onClick={() => setRegisterMode(true)}>Create Account</button>
        </>
      )}
    </div>
  );
}
