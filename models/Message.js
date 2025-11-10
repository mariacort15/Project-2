import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderName: { type: String, required: true },
  senderEmail: { type: String, required: true },
  phone: String,
  message: { type: String, required: true },
  property: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  dateSent: { type: Date, default: Date.now }
});

const Message = mongoose.model("Message", messageSchema);
export default Message;