import express from "express";
import { getOwnerDashboard } from "../controllers/ownerController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/dashboard", protect, (req, res) => {
  res.json({
    message: "Welcome to the Owner Dashboard",
    user: req.user
  });
});

export default router;