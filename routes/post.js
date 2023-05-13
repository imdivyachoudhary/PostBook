const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");

// router.get("/", (req, res) => {
//   res.send("Hello World");
// });

router.post("/reactions", postController.reactions);

router.post("/comments", postController.comments);

module.exports = router;
