const User = require("../../../models/user");
const jwt = require("jsonwebtoken");
const env = require("../../../config/env");

module.exports.loginUser = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user || req.body.password != user.password) {
      return res.status(422).json({
        message: "Invalid Email/Password",
      });
    }
    return res.status(200).json({
      message: "Sign in Successful, here is your token, please keep it safe",
      data: {
        token: jwt.sign(user.toJSON(), env.jwt_secret, { expiresIn: "100000" }),
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
