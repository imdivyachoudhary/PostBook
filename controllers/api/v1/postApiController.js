const Post = require("../../../models/post");
const Comment = require("../../../models/comment")
const Reaction = require("../../../models/reaction")

module.exports.getHomePosts = async (req, res) => {
  try {
    let posts = await Posts.find({})
      .sort("-createdAt")
      .populate({
        path: "user",
        select: ["_id", "name", "avatar"],
      })
      .populate({
        path: "reactions",
        select: ["reactionType"],
        populate: {
          path: "user",
          select: ["_id", "name", "avatar"],
        },
      })
      .populate({
        path: "comments",
        select: ["content"],
        populate: {
          path: "user",
          select: ["_id", "name", "avatar"],
        },
      });

    return res.status(200).json({
      posts: posts,
      message: "Posts fetched Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports.deletePost = async (req, res) => {
  console.log(req.params.id);
  try {
    let post = await Post.findById(req.params.id);
    if (post && post.user == req.user.id) {
      await fs.unlinkSync(path.join(__dirname, "..", post.content));
      await post.remove();
      await Comment.deleteMany({ post: post.id });
      await Reaction.deleteMany({ reactionable: post.id, onModel: "Post" });
      
        return res.status(200).json({
          message: "Post Deleted Successfully",
        });

    } else {
      return res.status(401).json({
        message: "Unauthorized Action, you cannot delete this post",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
