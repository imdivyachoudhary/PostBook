const development = {
  name: "development",
  asset_path: "./assets",
  session_cookie_key: "blahsomething",
  db_host: "127.0.0.1",
  db: "codeial_development",
  google_client_id:
    "160947273259-kjjluuqfmbp3vppjp4l7rj1k315lhmbp.apps.googleusercontent.com",
  google_client_secret: "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",
  smtp_user: "divyachoudhary.postbook",
  smtp_password: "rootdivya",
  jwt_secret: "codeial",
};

const production = {
  name: "production",
  asset_path: "./public/assets",
  session_cookie_key: "blahsomething",
  db_host: "127.0.0.1",
  db: "codeial_production",
  google_client_id:
    "160947273259-kjjluuqfmbp3vppjp4l7rj1k315lhmbp.apps.googleusercontent.com",
  google_client_secret: "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",
  smtp_user: "divyachoudhary",
  smtp_password: "root",
  jwt_secret: "codeial",
};

environment = eval(process.env.ENVIRONMENT);

module.exports = environment == undefined ? development : environment;
