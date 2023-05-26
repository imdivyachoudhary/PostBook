const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

const passport = require("passport");

router.get("/sign-in", userController.signIn);
router.post(
  "/sign-in",
  passport.authenticate("local", { failureRedirect: "/user/sign-in" }),
  userController.loginUser
);

router.get("/sign-up", userController.signUp);
router.post("/sign-up", userController.createUser);

router.get("/sign-out", userController.signOut);

router.get("/profile/", passport.checkAuthentication, userController.user);
router.get("/profile/posts", passport.checkAuthentication, userController.user);
router.get("/profile/friends", passport.checkAuthentication, userController.user);

router.get("/get-profile", passport.checkAuthentication, userController.profile);
router.post("/profile/update/:id", userController.update);
router.post("/profile/updateAvatar/:id", userController.updateAvatar);

router.get("/home", passport.checkAuthentication, userController.home);
router.get("/home/chats", passport.checkAuthentication, userController.home);
router.get("/home/more_people", passport.checkAuthentication, userController.home);

module.exports = router;
