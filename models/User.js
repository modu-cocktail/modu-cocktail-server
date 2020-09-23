// models/User.js
var mongoose = require("mongoose");

// Schema
var userSchema = mongoose.Schema({
  username: { type: String },
  provider: { type: String },
  like: [{ type: mongoose.Schema.Types.ObjectId, ref: "cocktails" }],
});

var User = mongoose.model("users", userSchema);

module.exports = User;
