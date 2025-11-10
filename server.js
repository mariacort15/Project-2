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

const userRoutes = require("./routes/userRoutes");
const authApiRoutes = require("./routes/authApiRoutes");
const authViewRoutes = require("./routes/authViewRoutes");
const session = require('express-session');
const flash = require('connect-flash');

require('dotenv').config(); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


app.use(
  session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
  })
);

app.use(flash());


app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});


app.use("/api/auth", authApiRoutes); 
app.use("/auth", authViewRoutes);   



const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use("/api/properties", propertyRoutes);
app.use("/api/auth", authRoutes);
app.use("/", messageRoutes);
app.use("/", ownerRoutes);
app.use("/owner", ownerRoutes);
app.use("/users", userRoutes);
app.use("/api/users", userRoutes);


app.get("/", async (req, res) => {
  const properties = await Property.find();
  res.render("index", { properties });
});



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));