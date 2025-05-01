import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Login from "./pages/Login";

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
      </Routes>
    </Router>
  );
}

export default App;
