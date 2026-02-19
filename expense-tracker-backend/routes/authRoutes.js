const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
  changePassword,
  deleteAccount,
  forgotPassword,
  resetPassword
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

// Auth Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Profile Routes
router.get("/profile", protect, getProfile);
router.put("/change-password", protect, changePassword);
router.delete("/delete-account", protect, deleteAccount);

module.exports = router;
