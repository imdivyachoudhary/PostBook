const express = require("express");
const router = express.Router();

const chatController = require("../controllers/chatController");

// router.get("/", (req, res) => {
//   res.send("Hello World");
// });

router.post("/showChatbox", chatController.showChatbox);

module.exports = router;
