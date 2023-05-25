const env = require("./env");
const fs = require("fs");
const path = require("path");

module.exports = (app) => {
  app.locals.assetPath = function (filePath) {
    if (env.name == "development") {
      return filePath;
    }
    return (
      "/" +
      JSON.parse(
        fs.readFileSync(
          path.join(__dirname, "../public/assets/rev-manifest.json")
        )
      )[filePath]
    );
  };

  app.locals.checkUserReaction = (user_id, reactions) => {
    return reactions.filter((reaction) => reaction.user == user_id);
  };
};
