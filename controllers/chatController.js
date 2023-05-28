const User = require("../models/user");

module.exports.showChatbox = async (req, res) => {
  try {
    let friend = await User.findById(req.body.friend_id);
    // console.log(friend)
    return res.render("chat-box", {
      layout: false,
      friend: friend,
      chatroom: "codeial",
    });
  } catch (error) {
    console.log(error);
    return "";
  }
};
