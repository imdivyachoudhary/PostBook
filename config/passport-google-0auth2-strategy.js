const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");

const User = require("../models/user");

passport.use(
  new googleStrategy(
    {
      clientID:
        "160947273259-kjjluuqfmbp3vppjp4l7rj1k315lhmbp.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8000/user/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ email: profile.emails[0].value }).exec(function (
        error,
        user
      ) {
        if (error) {
          console.log(
            "Error in finding user --> google strategy-passport : ",
            error
          );
          req.flash("error", "Something went Wrong");
          return done(error);
        }
        // console.log(profile);
        if (user) {
          return done(null, user);
        } else {
          User.create(
            {
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString("hex"),
            },
            function (error, user) {
              if (error) {
                console.log(
                  "Error in creating user --> google strategy-passport : ",
                  error
                );
                req.flash("error", "Something went Wrong");
                return done(error);
              }
              return done(null, user);
            }
          );
        }
      });
    }
  )
);

module.exports = passport;
