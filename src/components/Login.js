import React, { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      const response = await login(email, password); // Make sure this returns user data
      console.log(response); // Log response to debug

      if (response.success) {
        const userRole = response.user.accountType; // Get the user role from the response
        // Redirect based on the user role
        if (userRole === "Admin") {
          navigate("/admin-dashboard"); // Redirect to Admin Dashboard
        } else if (userRole === "Instructor") {
          navigate("/instructor-dashboard"); // Redirect to Instructor Dashboard
        } else if (userRole === "Student") {
          navigate("/student-dashboard"); // Redirect to Student Dashboard
        } else {
          setError("Unknown role, unable to redirect.");
        }
      } else {
        setError(response.message); // Handle error if login failed
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
      <p>
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
};

export default Login;