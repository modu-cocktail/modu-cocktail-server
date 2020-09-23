// models/Ingredient.js
var mongoose = require("mongoose");

// Schema
var ingredientSchema = mongoose.Schema({
  name: { type: String, required: true },
  img: { type: String },
});

var Ingredient = mongoose.model("ingredients", ingredientSchema);

module.exports = Ingredient;
