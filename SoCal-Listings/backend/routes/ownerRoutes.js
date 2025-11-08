import express from "express";
import { getOwnerDashboard } from "../controllers/ownerController.js";

const router = express.Router();

router.get("/owner/dashboard", getOwnerDashboard);

export default router;