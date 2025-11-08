import Property from "../models/Property.js";
import Message from "../models/Message.js";

export const getOwnerDashboard = async (req, res) => {
  try {
    
    const ownerId = req.user ? req.user._id : "672d88aabc55e7a9d999ce45"; 

    // Get all properties owned by this user
    const properties = await Property.find({ owner: ownerId });

    // Get all messages sent to this owner
    const messages = await Message.find({ owner: ownerId })
      .populate("property")
      .sort({ dateSent: -1 });

    res.render("owners/dashboard", { properties, messages });
  } catch (error) {
    res.status(500).send(error.message);
  }
};