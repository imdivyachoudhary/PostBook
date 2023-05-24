const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");

router.get("/user", postController.getUserPosts);
router.get("/home", postController.getHomePosts);

router.post("/create", postController.createPost);
router.delete("/delete/:id", postController.deletePost);

router.use("/comment", require("./comment"));

router.post("/reaction", postController.reactions);

module.exports = router;
