const express = require("express");
const router = express.Router();
const passport = require("passport");
const postApiController = require("../../../controllers/api/v1/postApiController");

router.get("/home", postApiController.getHomePosts);

router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  postApiController.deletePost
);

module.exports = router;
