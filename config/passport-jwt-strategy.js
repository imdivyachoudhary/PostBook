const passport = require("passport");
const env = require("./env");
const jwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;

const User = require("../models/user");

let opts = {
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.jwt_secret
}

passport.use(new jwtStrategy(opts, function(jwtPayLoad, done){
    User.findById(jwtPayLoad._id, function(error, user){
        if(error){
            console.log("Error in finding user from JWT : ",error);
            return;
        }
        if(user){
            return done(null,user);
        }
        else{
            return done(null, false);
        }
    })
}))

module.exports = passport;