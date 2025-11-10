import mongoose from "mongoose";
import dotenv from "dotenv";
import Property from "./models/Property.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected for seeding"))
  .catch((err) => console.error("MongoDB connection error:", err));

const properties = [
  {
    title: "Modern Family Home in Bakersfield",
    description: "Spacious 3-bedroom, 2-bathroom family home with a large backyard, close to schools and parks.",
    image: "https://images.unsplash.com/photo-1560185127-6ed189bf04bb",
    price: $2800,
    address: "123 Palm Street",
    city: "Bakersfield",
    propertyType: "House",
    bedrooms: 3,
    bathrooms: 2
  },
  {
    title: "Downtown Loft Apartment",
    description: "Stylish 1-bedroom loft with an open floor plan, great city views, and walking distance to cafes.",
    image: "https://images.unsplash.com/photo-1572120360610-d971b9b78825",
    price: $1995,
    address: "456 Main Ave",
    city: "Los Angeles",
    propertyType: "Apartment",
    bedrooms: 1,
    bathrooms: 1
  },
  {
    title: "Luxury Beachfront Condo",
    description: "Ocean-view condo with modern amenities, gym access, and private parking.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    price: $2100,
    address: "789 Ocean Drive",
    city: "Santa Monica",
    propertyType: "Condo",
    bedrooms: 2,
    bathrooms: 2
  },
  {
    title: "Cozy Studio in San Diego",
    description: "Perfect for students or professionals. Recently renovated with all new appliances.",
    image: "https://images.unsplash.com/photo-1599423300746-b62533397364",
    price: $1950,
    address: "321 Hillcrest Blvd",
    city: "San Diego",
    propertyType: "Studio",
    bedrooms: 1,
    bathrooms: 1
  },
  {
    title: "Spacious Suburban Home",
    description: "4-bedroom home with a large front yard, garage, and family-friendly neighborhood.",
    image: "https://images.unsplash.com/photo-1600585154209-3d0a4d227c1a",
    price: $3100,
    address: "654 Maple Avenue",
    city: "Irvine",
    propertyType: "House",
    bedrooms: 4,
    bathrooms: 3
  }
];

const seedData = async () => {
  try {
    await Property.deleteMany();
    await Property.insertMany(properties);
    console.log("Property data seeded successfully!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();


