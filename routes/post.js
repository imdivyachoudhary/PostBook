const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");

router.get("/user", postController.getUserPosts);
router.get("/home", postController.getHomePosts);

router.post("/create", postController.createPost);
router.delete("/delete/:id", postController.deletePost);

module.exports = router;
