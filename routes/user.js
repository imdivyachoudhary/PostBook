const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

const passport = require("passport");

// router.get("/", (req, res) => {
//   res.send("Hello World");
// });

router.get("/sign-in", userController.signIn);
router.post(
  "/sign-in",
  passport.authenticate("local", { failureRedirect: "/user/sign-in" }),
  userController.loginUser
);

router.get("/sign-up", userController.signUp);
router.post("/sign-up", userController.createUser);

router.get("/sign-out", userController.signOut);

router.get("/profile", passport.checkAuthentication, userController.profile);
router.get("/profile/posts", userController.profile);
router.get("/profile/friends", userController.profile);

router.get("/home", userController.home);
router.get("/home/chats", userController.home);
router.get("/home/more_people", userController.home);

router.get("/more_people", userController.more_people);
router.get("/received_requests", userController.received_requests);
router.get("/sent_requests", userController.sent_requests);

module.exports = router;
