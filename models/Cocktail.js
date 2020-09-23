// models/Cock.js
var mongoose = require("mongoose");

// Schema
var cocktailSchema = mongoose.Schema({
  name: { type: String, required: true },
  img: { type: String },
  alchohol: { type: Number },
  sprite: { type: Boolean },
  sweet: { type: Number },
  sour: { type: Number },
  bitter: { type: Number },
  recipe: { type: String },
  ingredient: [{ type: mongoose.Schema.Types.ObjectId, ref: "ingredients" }],
  thema: [{ type: mongoose.Schema.Types.ObjectId, ref: "themas" }],
  recommend: { type: Boolean },
});

var Cocktail = mongoose.model("cocktails", cocktailSchema);

module.exports = Cocktail;
