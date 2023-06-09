const User = require("../models/user");
const fs = require("fs");
const path = require("path");

// Start Redis Server to use queue
// const queue = require("../config/kue");
// const passwordUpdateMailer = require("../mailers/passwordUpdateMailer");
// const passworUpdateEmailWorker = require("../workers/passworUpdateEmailWorker");

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
  req.flash("success", "Logged In Successfully");
  return res.redirect("/user/profile");
};

module.exports.signUp = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/user/profile");
  }
  return res.render("sign-up", {
    title: "Sign Up",
  });
};

module.exports.createUser = (req, res) => {
  // console.log(req.cookies);
  if (req.body.password != req.body.confirm_password) {
    req.flash("warning", "Password and Confirm Password not Same");
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, function (error, user) {
    if (error) {
      console.log(error);
      req.flash("error", "User Could not be Created");
      return res.redirect("back");
    }
    if (!user) {
      User.create(req.body, function (error, user) {
        if (error) {
          console.log(error);
          req.flash("error", "User Could not be Created");
          return res.redirect("back");
        } else {
          req.flash("success", "User Signed Up Successfully");
          return res.redirect("/user/sign-in");
        }
      });
    } else {
      req.flash("warning", "User already exists with this Email");
      return res.redirect("back");
    }
  });
};

module.exports.signOut = (req, res) => {
  req.logout(function (error) {
    if (error) {
      // return next(error);
      console.log(error);
      req.flash("error", "User could not be Signed Out");
      return res.redirect("back");
    }
    req.flash("success", "You have Logged Out");
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
  try {
    if (req.user.id == req.params.id) {
      let user = await User.findById(req.params.id);

      if (req.body.name) user.name = req.body.name;
      if (req.body.email) user.email = req.body.email;
      await user.save();

      // return res.render("profile", {
      //   layout: false,
      //   user: user
      // });
      req.flash("success", "User Profile Updated Successfully");
      return res.redirect("back");
    } else {
      // return res.render("profile", {
      //   layout: false,
      // });
      req.flash("warning", "Unauthorized Action");
      return res.redirect("back");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "User Profile could not be Updated");
    return res.redirect("back");
  }
};

module.exports.updateAvatar = async (req, res) => {
  try {
    if (req.user.id == req.params.id) {
      let user = await User.findById(req.params.id);

      await User.uploadedAvatar(req, res, async function (error) {
        if (error) {
          console.log(error);
          req.flash("error", "Profile Picture could not be Updated");
          return res.redirect("back");
        }
        if (req.file) {
          // console.log(req.file);
          if (user.avatar) {
            await fs.unlinkSync(path.join(__dirname, "..", user.avatar));
          }
          user.avatar = User.avatarPath + "/" + req.file.filename;
          await user.save();
          req.flash("success", "Profile Picture Updated Successfully");
          return res.redirect("back");
        }
      });
      // });
      // return res.render("profile", {
      //   layout: false,
      // });
    } else {
      // return res.render("profile", {
      //   layout: false,
      // });
      req.flash("warning", "Unauthorized Action");
      return res.redirect("back");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "Profile Picture could not be Updated");
    return res.redirect("back");
  }
};

module.exports.updatePassword = async (req, res) => {
  try {
    if (req.body.password != req.body.confirm_password) {
      req.flash("warning", "Password and Confirm Password not Same");
      return res.redirect("back");
    }
    if (req.user.id == req.params.id) {
      let user = await User.findById(req.params.id);
      if (user.password != req.body.current_password) {
        req.flash("warning", "Incorrect Current Password");
        return res.redirect("back");
      }
      user.password = req.body.password;
      await user.save();

      // return res.render("profile", {
      //   layout: false,
      // });

      // passwordUpdateMailer.passwordUpdated(user);
      // queueMicrotask.create("emails", user).save(function (error) {
      //   if (error) {
      //     console.log(error);
      //   } else {
      //     console.log(job.id);
      //   }
      // });
      // let job = queue.create("emails", user).save(function (error) {
      //   if (error) {
      //     console.log(error);
      //   } else {
      //     console.log(job.id);
      //   }
      // });
      req.flash(
        "success",
        "Password Updated Successfully \n Please Login Again"
      );
      return res.redirect("/user/sign-out");
    } else {
      // return res.render("profile", {
      //   layout: false,
      // });
      req.flash("warning", "Unauthorized Action");
      return res.redirect("back");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "Password could not be Updated");
    return res.redirect("back");
  }
};

module.exports.home = (req, res) => {
  return res.render("home", {
    title: "Home",
  });
};

module.exports.updateOnlineStatus = async (req, res) => {
  try {
    let user = await User.findById(req.user.id);

    user.onlineStatus = req.body.onlineStatus;
    await user.save();

    if (req.xhr) {
      return res.status(200).json({
        message: "Online status Uploaded Successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      message: "Online status could not be Updated",
    });
  }
};

module.exports.updateOnlineStatusSocket = async (userId, onlineStatus) => {
  try {
    let user = await User.findById(userId);
    if (user) {
      user.onlineStatus = onlineStatus;
      await user.save();
    }

    // console.log("Online status Uploaded Successfully");
  } catch (error) {
    console.log(error);
    // console.log("Online status could not be Updated");
  }
};
