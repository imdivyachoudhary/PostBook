

module.exports.home = (req, res) => {
  // return res.render("home", {
  //   title: "Home",
  // });
  return res.redirect("/user/sign-in");
};
