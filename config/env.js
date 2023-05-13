const development = {
  name: "development",
  asset_path: "./assets",
  session_cookie_key: "blahsomething",
  db_host: "127.0.0.1",
  db: "codeial_development"
};

const production = {
  name: "production",
  asset_path: "./public/assets",
  session_cookie_key: "blahsomething",
  db_host: "127.0.0.1",
  db: "codeial_production"
};

environment = eval(process.env.ENVIRONMENT);

module.exports = environment == undefined ? development : environment;
