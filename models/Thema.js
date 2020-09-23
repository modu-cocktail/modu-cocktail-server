// models/Ingredient.js
var mongoose = require("mongoose");

// Schema
var themaSchema = mongoose.Schema({
  name: { type: String, required: true },
  cocktail: [{ type: mongoose.Schema.Types.ObjectId, ref: "cocktails" }],
});

var Thema = mongoose.model("themas", themaSchema);

module.exports = Thema;
