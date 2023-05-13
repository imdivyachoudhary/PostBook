const express = require("express");
const router = express.Router();

const homeController = require("../controllers/homeController");

// router.get("/", (req, res) => {
//   res.send("Hello World");
// });

router.get("/", homeController.home);

router.use('/user',require('./user'));

router.use('/post',require('./post'));

router.use('/chat',require('./chat'));

module.exports = router;
