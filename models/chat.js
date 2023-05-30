const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    chatroom: {
      type: String,
      required: true,
      unique: true,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        message: String,
        send_time: { type: Date, default: Date.now() },
        receive_time: Date,
        from_user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        to_user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        read_status: {
          type: String,
          enum: ["sent", "delivered", "seen"],
          default: "sent",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
