import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import WeatherPhenomena from "./pages/WeatherPhenomena";
import Dashboard from "./pages/Dashboard";

function App() {
  const [username, setUsername] = useState(localStorage.getItem("username"));

  const signOut = () => {
    localStorage.removeItem("username"); // Clear username from localStorage
    setUsername(null); // Update state
  };

  return (
    <Router>
      <Navbar username={username} onSignOut={signOut} /> {/* Navbar visible on all pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<Login setUsername={setUsername} />} />
        <Route path="/weather" element={<WeatherPhenomena />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
