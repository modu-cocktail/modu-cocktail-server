// routes/auth.js
var express = require("express");
var router = express.Router();
var passport = require("../config/passport");

router.get("/logout", function (req, res) {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.redirect("/");
  });
});

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google"), authSuccess);

function authSuccess(req, res) {
  res.redirect("/");
}

module.exports = router;
