const express = require("express");
const app = express();

const port = 8000;

const env = require("./config/env");

const path = require("path");

const db = require("./config/mongoose");

const expressLayouts = require("express-ejs-layouts");

const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");

const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const mongoStore = require("connect-mongo")(session);

const flash = require("connect-flash");
const customMiddleware = require("./config/middleware");

const chatServer = require("http").Server(app);
const chatSockets = require("./config/chat-sockets").chatSockets(chatServer);
const chatPort = 3000;

require("./config/view-helper")(app);

app.set("view engine", "ejs");

app.use(express.urlencoded());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());

app.use(cookieParser());

app.use(expressLayouts);
app.set("layout", "layout");
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

// const sassMiddleware = require("node-sass-middleware");
// if (env.name == "development") {
//   app.use(
//     sassMiddleware({
//       src: path.join(__dirname, env.asset_path, "sass"),
//       dest: path.join(__dirname, env.asset_path, "css"),
//       debug: true,
//       outputStyle: "extended",
//       prefix: "/css",
//     })
//   );
// }

app.use(express.static(env.asset_path));
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(
  session({
    name: "codeial",
    secret: "dididi",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new mongoStore(
      {
        mongooseConnection: db,
        autoRemove: "disabled",
      },
      function (error) {
        console.log(error || "connect-mongodb setup ok");
      }
    ),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMiddleware.setFlash);

app.use("/", require("./routes/index"));

app.listen(port, (error) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log(`App listening on port : ${port}`);
});

chatServer.listen(chatPort, (error) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log(`Chat Server listening on port : ${chatPort}`);
});

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });
