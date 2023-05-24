const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema(
  {
    reactionType: {
      type: String,
      required: true,
      enum: ["like", "laugh", "angry", "thumbs-up"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },

    reactionable: {
      type: mongoose.Schema.ObjectId,
      required: true,
      refPath: "onModel",
    },

    onModel: {
      type: String,
      required: true,
      enum: ["Post", "Comment"],
    },
  },
  {
    timestamps: true,
  }
);

const Reaction = mongoose.model("Reaction", reactionSchema);
module.exports = Reaction;
