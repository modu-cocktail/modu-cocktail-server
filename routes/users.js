// routes/user.js
var express = require("express");
var router = express.Router();
var User = require("../models/User");

router.get("/like", function (req, res) {
  // res.send(req.user.email);
  User.findOneAndUpdate({ email: req.user.email }, { $addToSet: { like: req.query.cocktail } }, function (err, user) {
    res.redirect("/cocktails/" + req.query.cocktail);
  });
});

router.get("/like/show", function (req, res) {
  User.findOne({ email: req.user.email })
    .populate("like")
    .exec(function (err, user) {
      res.render("users/like", { user: user });
    });
});

module.exports = router;
