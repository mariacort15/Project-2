import Property from "../models/Property.js";

const PropertyListing = require('../models/PropertyListing.js');


export const getProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const createProperty = async (req, res) => {
  try {
    const userId = req.user?.id;
    const role = req.user?.role;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (role !== "Owner" && role !== "Admin") {
      return res.status(403).json({ message: "Only Owners or Admins can add properties" });
    }

    const property = new Property({
      ...req.body,
      owner: userId
    });

    await property.save();
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });

    const userId = req.user?.id;
    const role = req.user?.role;

    if (property.owner.toString() !== userId && role !== "Admin") {
      return res.status(403).json({ message: "Access denied." });
    }

    const updated = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });

    const userId = req.user?.id;
    const role = req.user?.role;

    if (property.owner.toString() !== userId && role !== "Admin") {
      return res.status(403).json({ message: "Access denied." });
    }

    await property.deleteOne();
    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
