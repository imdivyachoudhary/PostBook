const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");
const Reaction = require("../models/reaction");
const fs = require("fs");
const path = require("path");

module.exports.getUserPosts = async (req, res) => {
  try {
    let posts = await Post.find({ user: req.user.id })
      .sort("-createdAt")
      .populate({
        path: "user",
        select:["_id","name","avatar"]})
      .populate("reactions");

    return res.render("post", { layout: false, posts: posts });
  } catch (error) {
    console.log(error);
    return "";
  }
};

module.exports.getHomePosts = async (req, res) => {
  try {
    let posts = await Post.find()
      .sort("-createdAt")
      .populate("user",["_id","name","avatar"])
      .populate("reactions");

    return res.render("post", { layout: false, posts: posts });
  } catch (error) {
    console.log(error);
    return "";
  }
};

module.exports.createPost = async (req, res) => {
  await Post.uploadedPost(req, res, async function (error) {
    if (error) {
      console.log("Multer Error : ", error);
      return res.status(500).json({
        message: "Post could not be Uploaded",
      });
    }
    if (req.file) {
      // console.log(req.file);

      let postPath = Post.postPath + "/" + req.file.filename;
      try {
        let post = await Post.create({
          content: postPath,
          user: req.user.id,
        });

        let user = await User.findById(req.user.id);

        if (req.xhr) {
          return res.status(200).json({
            data: {
              post: post,
              user: user,
            },
            message: "Post Uploaded Successfully",
          });
        }
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          message: "Post could not be Uploaded",
        });
      }
    }
  });
};

module.exports.deletePost = async (req, res) => {
  // console.log(req.params.id);
  try {
    let post = await Post.findById(req.params.id);
    if (post && post.user == req.user.id) {
      await fs.unlinkSync(path.join(__dirname, "..", post.content));
      await post.remove();
      await Comment.deleteMany({ post: post.id });
      await Reaction.deleteMany({ reactionable: post.id, onModel: "Post" });
      if (req.xhr) {
        return res.status(200).json({
          data: {
            post_id: post.id,
          },
          message: "Post Deleted Successfully",
        });
      }
    } else {
      return res.status(400).json({
        message: "Unauthorized Action",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Post could not be Deleted",
    });
  }
};
