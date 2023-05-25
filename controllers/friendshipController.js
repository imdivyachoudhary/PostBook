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
      return friendship.from_user == req.user.id
        ? friendship.to_user
        : friendship.from_user;
    });

    return res.render("friends", { layout: false, friends: friends });
  } catch (error) {
    console.log(error);
    return "";
  }
};

module.exports.unfriend = (req, res) => {
  return;
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

module.exports.sendRequest = (req, res) => {
  return;
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

module.exports.acceptRequest = (req, res) => {
  return;
};

module.exports.declineRequest = (req, res) => {
  return;
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

module.exports.unsendRequest = (req, res) => {
  return;
};
