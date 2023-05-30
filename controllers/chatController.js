const { log } = require("console");
const Chat = require("../models/chat");
const User = require("../models/user");
const Crypto = require("crypto");

module.exports.getChats = async (req, res) => {
  try {
    let chats = await Chat.find({
      users: { $in: [req.user.id] },
    })
      .populate("users", ["_id", "name", "avatar", "onlineStatus"])
      .sort("-updatedAt");
    // console.log(chats);
    let friends = await chats.map((chat) => {
      let l = chat.messages.length;
      let friend =
        chat.users[0].id == req.user.id ? chat.users[1] : chat.users[0];
      // console.log(typeof(friend))
      let m = chat.messages[l - 1];
      // console.log(m);
      if (
        !l ||
        (l && m.from_user == req.user.id) ||
        (l && m.from_user != req.user.id && m.read_status == "seen")
      ) {
        friend["seen"] = true;
      } else {
        friend["seen"] = false;
      }
      return friend;
    });
    // console.log(friends);
    return res.render("chats", {
      layout: false,
      friends: friends,
    });
  } catch (error) {
    console.log(error);
    return "";
  }
};

module.exports.showChatbox = async (req, res) => {
  try {
    let friend = await User.findById(req.body.friend_id);

    let chat = await Chat.findOne({
      users: { $all: [req.user.id, req.body.friend_id] },
    });
    let l = chat.messages.length;
    if (l) {
      let m = chat.messages[l - 1];
      if (m.from_user != req.user.id) {
        m.read_status = "seen";
        chat.save();
      }
    }
    // console.log(chat);
    return res.render("chat-box", {
      layout: false,
      friend: friend,
      chat: chat,
    });
  } catch (error) {
    console.log(error);
    return "";
  }
};

module.exports.createMessage = async (req, res) => {
  try {
    // console.log(req.body);
    // return;
    let chat = await Chat.findOne({
      chatroom: req.body.chatroom,
    });
    if (!chat) {
      return res.status(500).json({
        message: "Message coul not be Sent",
      });
    }
    let chat_message = {
      message: req.body.message,
      from_user: req.body.from_user,
      to_user: req.body.to_user,
    };
    await chat.messages.push(chat_message);
    await chat.save();
    // console.log(chat);
    // let sender = await User.findById(req.body.from_user);
    return res.status(200).json({
      data: {
        message: req.body.message,
      },
      message: "Message sent Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Message coul not be Sent",
    });
  }
};

module.exports.updateReadStatus = async (req, res) => {
  try {
    let chat = await Chat.findOne({
      chatroom: req.body.chatroom });
    let l = chat.messages.length;
    if (l) {
      let m = chat.messages[l - 1];
      if (m.from_user != req.user.id) {
        m.read_status = req.body.readStatus;
        chat.save();
      }
    }
    // console.log(chat);
    return res.status(200).json({
      data: {
        message: req.body.message,
      },
      message: "Read Status Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Read Status could not updated",
    });
  }
};
