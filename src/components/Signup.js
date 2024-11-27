import React, { useState } from "react";
import { signup } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountType, setAccountType] = useState("Student");
  const [contactNumber, setContactNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  // Validation functions
  const validateName = (name) => /^[A-Za-z\s]+$/.test(name);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateContactNumber = (number) => /^[0-9]{10}$/.test(number);

  // Password validation regex: at least one uppercase letter, one digit, one special character, and at least 6 characters
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/;

  // Password validation function
  const handlePasswordValidation = (password) => {
    if (!passwordRegex.test(password)) {
      setError("Password must contain at least one uppercase letter, one number, one special character, and be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const handleSendOtp = async () => {
    // Validate all fields before sending OTP
    if (!firstName || !lastName || !email || !password || !confirmPassword || !contactNumber) {
      setError("All fields are required.");
      return;
    }

    if (!validateName(firstName) || !validateName(lastName)) {
      setError("Name can only contain letters and spaces.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }

    if (!handlePasswordValidation(password)) {
      return; // If password is invalid, stop OTP sending
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!validateContactNumber(contactNumber)) {
      setError("Please enter a valid 10-digit contact number.");
      return;
    }

    // If all validations pass, send OTP
    try {
      const response = await signup({ email }); // Just sending email initially
      if (response.success) {
        setOtpSent(true);
      } else {
        setError(response.message); // Show detailed message from backend
      }
    } catch (err) {
      console.error(err); // Log detailed error for debugging
      setError("Error sending OTP. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if OTP is provided before submitting
    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }

    try {
      const response = await signup(
        { firstName, lastName, email, password, confirmPassword, accountType, contactNumber },
        otp
      );

      if (response.success) {
        const userRole = response.user.accountType; // Get user role
        if (userRole === "Admin") {
          navigate("/admin-dashboard");
        } else if (userRole === "Instructor") {
          navigate("/instructor-dashboard");
        } else if (userRole === "Student") {
          navigate("/student-dashboard");
        }
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Contact Number"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          required
        />
        <select onChange={(e) => setAccountType(e.target.value)} value={accountType}>
          <option value="Student">Student</option>
          <option value="Instructor">Instructor</option>
          <option value="Admin">Admin</option>
        </select>
        {!otpSent ? (
          <button type="button" onClick={handleSendOtp}>Send OTP</button>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button type="submit">Signup</button>
          </>
        )}
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Signup;