const express = require("express");
const router = express.Router();

const commentController = require("../controllers/commentController");

router.post("/", commentController.getComments);

router.post("/create", commentController.createComment);
router.delete("/delete/:id", commentController.deleteComment);

module.exports = router;
