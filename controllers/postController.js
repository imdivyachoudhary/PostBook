// const User = require("../models/user");

module.exports.reactions = (req, res) => {
  //   console.log(req);
  return res.render("reactions", {
    layout: false,
    title: "Reactions",
    // postid: req.body.postid,
    like: {
      users: [
        { display_pic: "/images/home-page.jpg", user_name: "Divya Choudhary" },
        { display_pic: "/images/home-page.jpg", user_name: "Divya Choudhary" },
      ],
    },
    laugh: {
      users: [
        { display_pic: "/images/home-page.jpg", user_name: "Simran" },
        { display_pic: "/images/home-page.jpg", user_name: "Simran" },
      ],
    },
    angry: {
      users: [
        { display_pic: "/images/home-page.jpg", user_name: "Radha" },
        { display_pic: "/images/home-page.jpg", user_name: "Radha" },
      ],
    },
    thumbs_up: {
      users: [
        { display_pic: "/images/home-page.jpg", user_name: "Sita" },
        { display_pic: "/images/home-page.jpg", user_name: "Sita" },
      ],
    },
  });
};

module.exports.comments = (req, res) => {
  return res.render("comments", {
    layout: false,
    title: "Comments",
  });
};
