import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar({ username, onSignOut }) {
  const location = useLocation(); // Get the current page
  const navigate = useNavigate();

  const handleAuthAction = () => {
    if (username) {
      onSignOut(); // Call the sign-out function if the user is signed in
    } else {
      navigate("/login"); // Redirect to the login page if the user is signed out
    }
  };

  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "1rem", background: "#f4f4f4", borderBottom: "1px solid #ccc" }}>
      <div>
        {location.pathname !== "/" && <Link to="/">Home</Link>} {/* Show Home link if not on Home */}
        {location.pathname !== "/blog" && <Link to="/blog" style={{ marginLeft: "1rem" }}>Blog</Link>} {/* Show Blog link if not on Blog */}
      </div>
      <div>
        {username ? (
          <>
            <span>Welcome, <b>{username}</b></span>
            <button
              onClick={handleAuthAction}
              style={{ marginLeft: "1rem", background: "red", color: "white", border: "none", padding: "0.5rem 1rem", cursor: "pointer" }}
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            onClick={handleAuthAction}
            style={{ background: "green", color: "white", border: "none", padding: "0.5rem 1rem", cursor: "pointer" }}
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}