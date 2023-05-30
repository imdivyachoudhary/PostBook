const express = require("express");
const router = express.Router();

const chatController = require("../controllers/chatController");

// router.get("/", (req, res) => {
//   res.send("Hello World");
// });

router.get("/", chatController.getChats);
router.post("/show-chat", chatController.showChatbox);
router.post("/create-message", chatController.createMessage);
router.post("/update-read-status", chatController.updateReadStatus);

module.exports = router;
