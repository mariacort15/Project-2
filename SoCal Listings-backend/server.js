import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import connectDB from "./config/db.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import Property from "./models/Property.js";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import ownerRoutes from "./routes/ownerRoutes.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Setup __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/api/properties", propertyRoutes);
app.use("/api/auth", authRoutes);
app.use("/", messageRoutes);
app.use("/", ownerRoutes);

// Home route
app.get("/", async (req, res) => {
  const properties = await Property.find();
  res.render("index", { properties });
});

// Auth routes
app.get("/auth/sign-up", (req, res) => {
  res.render("auth/sign-up");
});

app.get("/auth/sign-in", (req, res) => {
  res.render("auth/sign-in");
});

// Start server (last line)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));