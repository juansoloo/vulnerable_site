import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login({ setUsername }) {
  const [username, setLocalUsername] = useState("");
  const [password, setPassword] = useState("");
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

  return (
    <div>
      <h1>Sign In</h1>
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
      <button onClick={handleLogin}>Sign In</button>
    </div>
  );
}
