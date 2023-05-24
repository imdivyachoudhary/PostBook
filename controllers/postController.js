const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");
const fs = require("fs");
const path = require("path");

module.exports.getUserPosts = async (req, res) => {
  try {
    let posts = await Post.find({ user: req.user.id })
      .sort("-createdAt")
      .populate("user");

    return res.render("post", { layout: false, posts: posts });
  } catch (error) {
    console.log(error);
    return "";
  }
};

module.exports.getHomePosts = async (req, res) => {
  try {
    let posts = await Post.find().sort("-createdAt").populate("user");

    return res.render("post", { layout: false, posts: posts });
  } catch (error) {
    console.log(error);
    return "";
  }
};

module.exports.createPost = async (req, res) => {
  await Post.uploadedPost(req, res, function (err) {
    if (err) {
      console.log("Multer Error : ", err);
      return res.redirect("back");
    }
    if (req.file) {
      // console.log(req.file);
      var createPost = (async function () {
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
              message: "Post created",
            });
          }
        } catch (error) {
          console.log(error);
          return res.redirect("back");
        }
      })();
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
      await Comment.deleteMany({post: req.params.id});
      if (req.xhr) {
        return res.status(200).json({
          data: {
            post_id: req.params.id,
          },
          message: "Post deleted",
        });
      }
    }
    return res.status(400).json({
      message: "Post could not be deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Post could not be deleted",
    });
  }
};

module.exports.reactions = (req, res) => {
  //   console.log(req);
  return res.render("reaction", {
    layout: false,
    title: "Reactions",
    // postid: req.body.postid,
    like: {
      users: [
        { display_pic: "/images/home-page.jpg", user_name: "Divya Choudhary" },
        { display_pic: "/images/home-page.jpg", user_name: "Divya Choudhary" },
      ],
    },
    laugh: {
      users: [
        { display_pic: "/images/home-page.jpg", user_name: "Simran" },
        { display_pic: "/images/home-page.jpg", user_name: "Simran" },
      ],
    },
    angry: {
      users: [
        { display_pic: "/images/home-page.jpg", user_name: "Radha" },
        { display_pic: "/images/home-page.jpg", user_name: "Radha" },
      ],
    },
    thumbs_up: {
      users: [
        { display_pic: "/images/home-page.jpg", user_name: "Sita" },
        { display_pic: "/images/home-page.jpg", user_name: "Sita" },
      ],
    },
  });
};
