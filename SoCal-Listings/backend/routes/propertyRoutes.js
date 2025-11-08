import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
} from "../controllers/propertyController.js";

const PropertyListing = require('../models/PropertyListing');

const router = express.Router();

router.get("/", getProperties);
router.get("/:id", getPropertyById);
router.post("/", createProperty);
router.put("/:id", updateProperty);
router.delete("/:id", deleteProperty);
router.post("/", verifyToken, createProperty);

router.get('/properties/:id', async (req, res) => {
  const property = await PropertyListing.findById(req.params.id);
  res.render('properties/show', { property });
});

export default router;