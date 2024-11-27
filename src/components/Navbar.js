import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Set default state based on authentication status
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response.success) {
        setIsLoggedIn(false); // Update state
        navigate("/login"); // Redirect to login page
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav>
      <ul>
        {isLoggedIn ? (
          <>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;