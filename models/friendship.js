const mongoose = require("mongoose");

const friendshipSchema = new mongoose.Schema(
  {
    from_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    to_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    friendshipStatus: {
      type: String,
      required: true,
      enum: ['pending','confirm'],
    },

    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Chat"
    }
  },
  {
    timestamps: true,
  }
);

const Friendship = mongoose.model("Friendship", friendshipSchema);
module.exports = Friendship;
