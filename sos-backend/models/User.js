const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  userId: String,
  password: String
  });

module.exports = mongoose.model("User", userSchema);