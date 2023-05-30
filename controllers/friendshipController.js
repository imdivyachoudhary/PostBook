const User = require("../models/user");
const Friendship = require("../models/friendship");
const Chat = require("../models/chat");
const Crypto = require("crypto");

module.exports.friends = async (req, res) => {
  try {
    let friendships = await Friendship.find({
      friendshipStatus: "confirm",
      $or: [{ from_user: req.user.id }, { to_user: req.user.id }],
    })
      .populate("from_user", ["_id", "name", "avatar", "onlineStatus"])
      .populate("to_user", ["_id", "name", "avatar", "onlineStatus"]);

    let friends = await friendships.map((friendship) => {
      return friendship.from_user.id == req.user.id
        ? friendship.to_user
        : friendship.from_user;
    });
    return res.render("friends", { layout: false, friends: friends });
  } catch (error) {
    console.log(error);
    return "";
  }
};

module.exports.unfriend = async (req, res) => {
  try {
    let friendship = await Friendship.findOne({
      friendshipStatus: "confirm",
      $or: [
        { from_user: req.user.id, to_user: req.body.friend_id },
        { from_user: req.body.friend_id, to_user: req.user.id },
      ],
    }).populate("chat");
    // console.log(friendship.chat);
    if (friendship.chat && !friendship.chat.messages.length) {
      await Chat.findByIdAndDelete(friendship.chat.id);
    }

    await friendship.remove();

    // let user = await User.findById(req.user.id);
    let friend = await User.findById(req.body.friend_id);
    // await user.friends.pull(friend.id);
    // await friend.friends.pull(user.id);
    // await user.save();
    // await friend.save();

    if (req.xhr) {
      return res.status(200).json({
        data: {
          friend: friend,
        },
        message: "Unfriended Successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Friend could not be Unfriend",
    });
  }
};

module.exports.morePeople = async (req, res) => {
  try {
    let friendships = await Friendship.find({
      $or: [{ from_user: req.user.id }, { to_user: req.user.id }],
    });
    let friends = await friendships.map((friendship) => {
      return friendship.from_user == req.user.id
        ? friendship.to_user
        : friendship.from_user;
    });
    await friends.push(req.user.id);

    let more_people = await User.find({ _id: { $nin: friends } }).select([
      "_id",
      "name",
      "avatar",
    ]);

    return res.render("more-people", {
      layout: false,
      more_people: more_people,
    });
  } catch (error) {
    console.log(error);
    return "";
  }
};

module.exports.sendRequest = async (req, res) => {
  try {
    let friendship = await Friendship.findOne({
      to_user: req.user.id,
      from_user: req.body.friend_id,
      friendshipStatus: "pending",
    });
    if (friendship) {
      return res.status(500).json({
        message: "Friend Request could not be Send",
      });
    }
    await Friendship.create({
      from_user: req.user.id,
      to_user: req.body.friend_id,
      friendshipStatus: "pending",
    });

    let friend = await User.findById(req.body.friend_id).select([
      "_id",
      "name",
      "avatar",
    ]);

    if (req.xhr) {
      return res.status(200).json({
        data: {
          friend: friend,
        },
        message: "Friend Request Sent",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Friend Request could not be Send",
    });
  }
};

module.exports.receivedRequests = async (req, res) => {
  try {
    let friendships = await Friendship.find({
      friendshipStatus: "pending",
      to_user: req.user.id,
    }).populate("from_user", ["_id", "name", "avatar"]);

    let friends = await friendships.map((friendship) => {
      return friendship.from_user;
    });

    return res.render("received-requests", {
      layout: false,
      friends: friends,
    });
  } catch (error) {
    console.log(error);
    return "";
  }
};

module.exports.acceptRequest = async (req, res) => {
  try {
    let chat = await Chat.findOne({
      users: { $all: [req.user.id, req.body.friend_id] },
    });
    if (!chat) {
      let chatroom =
        (await Crypto.randomBytes(20).toString("hex")) + Date.now();
      chat = await Chat.create({
        chatroom: chatroom,
        users: [req.user.id, req.body.friend_id],
      });
    }

    await Friendship.findOneAndUpdate(
      {
        to_user: req.user.id,
        from_user: req.body.friend_id,
      },
      {
        friendshipStatus: "confirm",
        chat: chat.id,
      }
    );

    let friend = await User.findById(req.body.friend_id).select([
      "_id",
      "name",
      "avatar",
      "onlineStatus",
    ]);

    if (req.xhr) {
      return res.status(200).json({
        data: {
          friend: friend,
        },
        message: "Friend Request Accepted",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Friend Request Could not be Accepted",
    });
  }
};

module.exports.declineRequest = async (req, res) => {
  try {
    await Friendship.deleteOne({
      to_user: req.user.id,
      from_user: req.body.friend_id,
      friendshipStatus: "pending",
    });

    let friend = await User.findById(req.body.friend_id).select([
      "_id",
      "name",
      "avatar",
    ]);

    if (req.xhr) {
      return res.status(200).json({
        data: {
          friend: friend,
        },
        message: "Friend Request Declined",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Friend Request Could not be Declined",
    });
  }
};

module.exports.sentRequests = async (req, res) => {
  try {
    let friendships = await Friendship.find({
      friendshipStatus: "pending",
      from_user: req.user.id,
    }).populate("to_user", ["_id", "name", "avatar"]);

    let friends = await friendships.map((friendship) => {
      return friendship.to_user;
    });

    return res.render("sent-requests", {
      layout: false,
      friends: friends,
    });
  } catch (error) {
    console.log(error);
    return "";
  }
};

module.exports.unsendRequest = async (req, res) => {
  try {
    await Friendship.deleteOne({
      from_user: req.user.id,
      to_user: req.body.friend_id,
      friendshipStatus: "pending",
    });

    let friend = await User.findById(req.body.friend_id).select([
      "_id",
      "name",
      "avatar",
    ]);

    if (req.xhr) {
      return res.status(200).json({
        data: {
          friend: friend,
        },
        message: "Friend Request Unsent",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Friend Request Could not be Unsend",
    });
  }
};
