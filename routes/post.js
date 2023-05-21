const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");

router.post("/",postController.getPosts);
router.post("/create", postController.createPost);

router.post("/reactions", postController.reactions);

router.post("/comments", postController.comments);

module.exports = router;
