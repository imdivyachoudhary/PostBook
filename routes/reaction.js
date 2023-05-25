const express = require("express");
const router = express.Router();

const reactionController = require("../controllers/reactionController");

router.post("/post", reactionController.getPostReactions);

router.post("/toggle-reaction", reactionController.toggleReaction);

module.exports = router;
