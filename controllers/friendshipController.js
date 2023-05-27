const User = require("../models/user");
const Friendship = require("../models/friendship");

module.exports.friends = async (req, res) => {
  try {
    let friendships = await Friendship.find({
      friendshipStatus: "confirm",
      $or: [{ from_user: req.user.id }, { to_user: req.user.id }],
    })
      .populate("from_user")
      .populate("to_user");

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
    await Friendship.deleteOne({
      friendshipStatus: "confirm",
      $or: [{ from_user: req.user.id,to_user: req.body.friend_id }, { from_user: req.body.friend_id,to_user: req.user.id }],
    });

    let friend = await User.findById(req.body.friend_id);

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

    let more_people = await User.find({ _id: { $nin: friends } });

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
    })
    if(friendship){
      return res.status(500).json({
        message: "Friend Request could not be Send",
      });
    }
    await Friendship.create({
      from_user: req.user.id,
      to_user: req.body.friend_id,
      friendshipStatus: "pending",
    });

    let friend = await User.findById(req.body.friend_id);

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
    }).populate("from_user");

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
    await Friendship.findOneAndUpdate({
      to_user: req.user.id,
      from_user: req.body.friend_id,},{
      friendshipStatus: "confirm",
    });

    let friend = await User.findById(req.body.friend_id);

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

    let friend = await User.findById(req.body.friend_id);

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
    }).populate("to_user");

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

    let friend = await User.findById(req.body.friend_id);

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
