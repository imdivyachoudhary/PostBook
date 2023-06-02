const passport = require("passport");

const localStrategy = require("passport-local").Strategy;

const User = require("../models/user");

passport.use(
  new localStrategy(
    {
      usernameField: "email",
      passReqToCallback: true
    },
    function (req, email, password, done) {
      User.findOne({ email: email }, function (error, user) {
        if (error) {
          console.log("Error in finding user --> passport : ",error);
          req.flash("error","Something went Wrong");
          return done(error);
        }
        if (!user || user.password != password) {
          console.log("Invalid Email/Password");
          req.flash("warning","Invalid Email/Password");
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (error, user) {
    if (error) {
      console.log("Error in finding user --> passport : ",error);
      req.flash("error","Something went Wrong");
      return done(error);
    }
    return done(null, user);
  });
});

passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/user/sign-in");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
