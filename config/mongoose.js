const env = require("./env");
const mongoose = require("mongoose");

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(`mongodb://${env.db_host}/${env.db}`);
  console.log(`Connected to DB : ${env.db}`);
}

const db = mongoose.connection;

module.exports = db;

// db.on("error", console.error.bind(console, "Error connecting to db"));

// db.once("open", function () {
//   console.log("Successfully connected to db");
// });
