const User = require("../models/user");
const fs = require("fs");
const path = require("path");

module.exports.signIn = (req, res) => {
  // console.log(req.cookies);
  // res.cookie("user_id", 23);
  if (req.isAuthenticated()) {
    return res.redirect("/user/profile");
  }
  return res.render("sign-in", {
    title: "Sign In",
  });
};

module.exports.loginUser = (req, res) => {
  // console.log(req.cookies);
  // if (req.body.password != req.body.confirm_password) {
  //   return res.redirect("back");
  // }
  // console.log(req.body);
  return res.redirect("/user/profile");
};

module.exports.signUp = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/user/dashboard");
  }
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

module.exports.signOut = (req, res) => {
  req.logout(function (err) {
    if (err) {
      // return next(err);
      console.log(err);
      return res.redirect("back");
    }
    return res.redirect("/user/sign-in");
  });
};

module.exports.user = (req, res) => {
  return res.render("user", {
    title: "Profile",
  });
};

module.exports.profile = (req, res) => {
  return res.render("profile", {
    layout: false,
  });
};

module.exports.update = async (req, res) => {
  // console.log(req.body);
  if (req.user.id == req.params.id) {
    let user = await User.findById(req.params.id);

    if (req.body.name) user.name = req.body.name;
    if (req.body.email) user.email = req.body.email;
    await user.save();

    // return res.render("profile", {
    //   layout: false,
    //   user: user
    // });
    return res.redirect("back");
  } else {
    // return res.render("profile", {
    //   layout: false,
    // });
    return res.redirect("back");
  }
};

module.exports.updateAvatar = async (req, res) => {
  // console.log(req.body);
  // console.log(JSON.stringify(req.body));
  // console.log(req.files);
  // console.log(req.file);
  // console.log(req);
  // return res.redirect("back");
  if (req.user.id == req.params.id) {
    let user = await User.findById(req.params.id);
    User.uploadedAvatar(req, res, function (err) {
      if (err) {
        console.log("Multer Error : ", err);
      }
      if (req.file) {
        // console.log(req.file);
        if (user.avatar) {
          fs.unlinkSync(path.join(__dirname, "..", user.avatar));
        }
        user.avatar = User.avatarPath + "/" + req.file.filename;
        user.save();
      }
    });
    // });
    // return res.render("profile", {
    //   layout: false,
    // });
    return res.redirect("back");
  }
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
