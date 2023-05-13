const User = require("../models/user");

module.exports.signIn = (req, res) => {
  // console.log(req.cookies);
  // res.cookie("user_id", 23);
  return res.render("sign-in", {
    title: "Sign In",
  });
};

module.exports.loginUser = (req, res) => {
  // console.log(req.cookies);
  // if (req.body.password != req.body.confirm_password) {
  //   return res.redirect("back");
  // }
  return res.redirect("/user/profile");
};

module.exports.signUp = (req, res) => {
  return res.render("sign-up", {
    title: "Sign Up",
  });
};

module.exports.createUser = (req, res) => {
  // console.log(req.cookies);
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error in finding User while Sign-up");
      return res.redirect("back");
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("Error in creating User :", err);
          return res.redirect("back");
        } else {
          return res.redirect("/user/sign-in");
        }
      });
    } else {
      return res.redirect("back");
    }
  });
};

module.exports.profile = (req, res) => {
  return res.render("profile", {
    title: "Profile",
  });
};

module.exports.home = (req, res) => {
  return res.render("home", {
    title: "Home",
  });
};

module.exports.more_people = (req, res) => {
  return res.render("friends-list", {
    layout: false,
    add_friend: true,
    received_request: false,
    sent_request: false,
  });
};

module.exports.received_requests = (req, res) => {
  return res.render("friends-list", {
    layout: false,
    add_friend: false,
    received_request: true,
    sent_request: false,
  });
};

module.exports.sent_requests = (req, res) => {
  return res.render("friends-list", {
    layout: false,
    add_friend: false,
    received_request: false,
    sent_request: true,
  });
};
