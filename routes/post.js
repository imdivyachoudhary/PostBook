const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");

router.get("/",postController.getPosts);
router.post("/create", postController.createPost);
router.delete("/delete/:id", postController.deletePost);

router.post("/reactions", postController.reactions);

router.post("/comments", postController.comments);

module.exports = router;
