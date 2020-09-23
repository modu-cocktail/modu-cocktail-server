// routes/home.js
var express = require("express");
var router = express.Router();
var Cocktail = require("../models/Cocktail");

// Home(첫번쨰 nav + 추천메뉴)
router.get("/", function (req, res) {
  Cocktail.find({ recommend: true }, function (err, cocktails) {
    if (err) res.send(err);
    res.render("home/index", { cocktails: cocktails });
  });
});

module.exports = router;
