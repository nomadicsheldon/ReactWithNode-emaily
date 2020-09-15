//jshint esversion:6

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const cookieSession = require("cookie-session");
const passport = require("passport");
// ==> order
require("./models/User"); // 1
require("./services/passport"); // 2

mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const app = express();

// ############################## cookie setting ##############################
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);

app.use(passport.initialize());
app.use(passport.session());

// ############################## routes ##############################
require("./routes/authRoutes")(app);
// ############################## port setting ##############################
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Listening for server started on port 5000");
});
