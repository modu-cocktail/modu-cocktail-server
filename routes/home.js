// routes/home.js
var express = require("express");
var router = express.Router();
var Cocktail = require("../models/Cocktail");

// Home(첫번쨰 nav)
router.get("/", function (req, res) {
  // Cocktail.find({}, function (err, cocktails) {
  //   if (err) res.send(err);
  //   res.render("home/index", { cocktails: cocktails });
  // });
  res.render("home/index");
});

module.exports = router;
