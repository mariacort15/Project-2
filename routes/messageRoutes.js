import express from "express";
import { showContactForm, sendMessage } from "../controllers/messageController.js";

const router = express.Router();

router.get("/contact-owner/:ownerId", showContactForm);
router.post("/contact-owner/:ownerId", sendMessage);

export default router;