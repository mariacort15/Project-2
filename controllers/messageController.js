import Message from "../models/Message.js";
import Property from "../models/Property.js";
import User from "../models/User.js";

// Render contact form
export const showContactForm = async (req, res) => {
  try {
    const owner = await User.findById(req.params.ownerId);
    const property = await Property.findById(req.query.propertyId);
    if (!owner) return res.status(404).send("Owner not found");
    res.render("contact/form", { owner, property });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Handle form submission
export const sendMessage = async (req, res) => {
  try {
    const { senderName, senderEmail, phone, message, propertyId } = req.body;
    const owner = await User.findById(req.params.ownerId);

    if (!owner) return res.status(404).send("Owner not found");

    const newMessage = new Message({
      senderName,
      senderEmail,
      phone,
      message,
      property: propertyId,
      owner: owner._id
    });

    await newMessage.save();
    res.render("contact/success", { owner, senderName });
  } catch (error) {
    res.status(500).send(error.message);
  }
};