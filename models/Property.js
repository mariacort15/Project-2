import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    price: { type: Number, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    propertyType: { type: String, required: true },
    bedrooms: { type: Number },
    bathrooms: { type: Number },
    datePosted: { type: Date, default: Date.now },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", }, 
    
  },
  { timestamps: true }
);

const Property = mongoose.model("Property", propertySchema);

export default Property;