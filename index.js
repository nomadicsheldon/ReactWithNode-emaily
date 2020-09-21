//jshint esversion:6

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
// ==> order
require("./models/User"); // 1
require("./models/Survey"); // 1
require("./services/passport"); // 2

mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const app = express();

// ############################## cookie setting ##############################
app.use(bodyParser.json());
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
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);
// ############################## port setting ##############################
if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static("client/build"));

  // Express will serve up the index.html file, if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Listening for server started on port 5000");
});
