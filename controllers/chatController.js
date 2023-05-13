

module.exports.showChatbox = (req, res) => {
    return res.render("chat-box", {
      layout: false,
      title: "Chat-Box",
    });
  };