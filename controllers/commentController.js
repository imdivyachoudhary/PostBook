const Comment = require("../models/comment");
const Post = require("../models/post");
const User = require("../models/user");
const Reaction = require("../models/reaction");

module.exports.getComments = async (req, res) => {
  try {
    let comments = await Comment.find({ post: req.body.post_id })
      .sort("-createdAt")
      .populate("user")
      .populate("reactions");

    return res.render("comment", {
      layout: false,
      comments: comments,
    });
  } catch (error) {
    console.log(error);
    return "";
  }
};

module.exports.createComment = async (req, res) => {
  try {
    let post = await Post.findById(req.body.post_id);

    if (post) {
      let comment = await Comment.create({
        content: req.body.comment,
        user: req.user.id,
        post: req.body.post_id,
      });

      await post.comments.push(comment);
      await post.save();

      let user = await User.findById(req.user.id);

      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment: comment,
            user: user,
          },
          message: "Comment created",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Comment could not be created",
    });
  }
};

module.exports.deleteComment = async (req, res) => {
  // console.log(req.params.id);
  try {
    let comment = await Comment.findById(req.params.id);
    if (comment && comment.user == req.user.id) {
      let post_id = comment.post;
      await comment.remove();
      await Post.findByIdAndUpdate(post_id, {
        $pull: { comments: req.params.id },
      });
      await Reaction.deleteMany({ reactionable: comment.id, onModel: "Comment" });
      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment_id: req.params.id,
          },
          message: "Comment deleted",
        });
      }
    }
    return res.status(400).json({
      message: "Comment could not be deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Comment could not be deleted",
    });
  }
};
