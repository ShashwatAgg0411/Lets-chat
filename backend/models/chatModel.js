const mongoose = require("mongoose");
const { Schema } = mongoose;
// const User = require("./UserModel");

const chatSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    admin_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
    // latestmessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
