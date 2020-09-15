//jshint esversion:6

const mongoose = require("mongoose");
const { Schema } = mongoose; // destructuring

const userSchema = new Schema({
  googleId: String,
});

mongoose.model("users", userSchema);
