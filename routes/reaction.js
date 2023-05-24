const express = require("express");
const router = express.Router();

const reactionController = require("../controllers/reactionController");

router.post("/", reactionController.getReactions);

router.post("/toggle-reaction", reactionController.toggleReaction);

module.exports = router;
