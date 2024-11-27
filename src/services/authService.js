import axios from 'axios';

const API_URL = "http://localhost:4000/api/auth"; // Backend URL

// Function to send OTP
export const sendOtp = async (email) => {
  const response = await axios.post(`${API_URL}/sendotp`, { email });
  return response.data;
};

// Function for signup (including OTP verification)
export const signup = async (userData, otp = null) => {
  // First, attempt to send OTP if not sent already
  if (!otp) {
    const sendOtpResponse = await sendOtp(userData.email);
    if (sendOtpResponse.success) {
      return { success: true };
    }
    throw new Error('OTP sending failed');
  }

  // If OTP is provided, complete the signup process
  const { firstName, lastName, email, password, confirmPassword, accountType, contactNumber } = userData;
  const finalData = { firstName, lastName, email, password, confirmPassword, accountType, contactNumber, otp };
  const response = await axios.post(`${API_URL}/signup`, finalData);
  return response.data;
};

// Function to handle login
export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

// Logout function
export const logout = async () => {
  const response = await axios.post(`${API_URL}/logout`);
  return response.data;
};

// Example getLoggedInUser function
export const getLoggedInUser = async () => {
  const response = await axios.get(`${API_URL}/me`, { withCredentials: true });
  return response.data;  // Ensure response.data contains success and user properties
};