import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register a new user (tenant or owner)
router.post("/register", registerUser);

// Login existing user
router.post("/login", loginUser);

// Logout user (clears token)
router.post("/logout", logoutUser);

// Get user profile (protected)
router.get("/profile", protect, getUserProfile);

export default router;