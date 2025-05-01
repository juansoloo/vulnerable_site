import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setUsername }) {
  const [username, setLocalUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Simulate login (replace with actual API call)
    if (username.trim() && password.trim()) {
      localStorage.setItem("username", username); // Save username to localStorage
      setUsername(username); // Update state in App
      navigate("/"); // Redirect to Home
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
