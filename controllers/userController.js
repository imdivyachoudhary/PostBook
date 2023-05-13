const User = require("../models/user");

module.exports.signIn = (req, res) => {
  return res.render("sign-in", {
    title: "Sign In",
  });
};

module.exports.signUp = (req, res) => {
  return res.render("sign-up", {
    title: "Sign Up",
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