// Import the required modules
const express = require("express")
const router = express.Router()

// Import the required controllers and middleware functions
const {
  login,
  signup,
  sendotp,
  logout,
  showLoggedInUser,
} = require("../controllers/Auth")

// Routes for Login, Logout, Signup, Authentication

// Route for user login
router.post("/login", login)

// Route for user logout
router.post("/logout", logout);

// Route for user signup
router.post("/signup", signup)

// Route for sending OTP to the user's email
router.post("/sendotp", sendotp)

// Route for showing logged-in user details
router.get("/me", showLoggedInUser);

module.exports = router