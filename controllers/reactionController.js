const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");
const Reaction = require("../models/reaction");

module.exports.getReactions = async (req, res) => {
  try {
    let reactions = await Reaction.find({ user: req.user.id }).populate("user");

    return res.render("reaction", { layout: false, reactions: reactions });
  } catch (error) {
    console.log(error);
    return "";
  }
};

module.exports.toggleReaction = async (req, res) => {
  try {
    let reactionable;
    let increaseCount = 0;
    if (req.body.type == "Post") {
      reactionable = await Post.findById(req.body.id);
    } else if (req.body.type == "Comment") {
      reactionable = await Comment.findById(req.body.id);
    }

    let existingReaction = await Reaction.findOne({
      reactionable: req.body.id,
      onModel: req.body.type,
      user: req.user.id,
    });

    if (existingReaction) {
      if (existingReaction.reactionType == req.body.reactionType) {
        reactionable.reactions.pull(existingReaction.id);
        await reactionable.save();
        await existingReaction.remove();
        increaseCount -= 1;
      } else {
        existingReaction.reactionType = req.body.reactionType;
        await existingReaction.save();
      }
    } else {
      let reaction = await Reaction.create({
        reactionType: req.body.reactionType,
        reactionable: req.body.id,
        onModel: req.body.type,
        user: req.user.id,
      });

      reactionable.reactions.push(reaction.id);
      await reactionable.save();
      increaseCount += 1;
    }

    return res.status(200).json({
      data: {
        increaseCount: increaseCount,
      },
      message: "Request Successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
