// config/passport.js
var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth2").Strategy;
var User = require("../models/User");

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: "688137856464-2ad3ljc9rrf4g1f5l1tn8m4eea164ltk.apps.googleusercontent.com",
      clientSecret: "spQmJPnatxWvKorDYMXxfLkV",
      callbackURL: "/auth/google/callback",
      passReqToCallback: true,
    },
    function (req, accessToken, refreshToken, profile, done) {
      console.log(profile);
      User.findOne({ username: profile.id }, function (err, user) {
        if (err) res.send(err);
        if (user) {
          done(null, user);
        } else {
          var newUser = new User({ username: profile.id });
          newUser.save(function (err, user) {
            if (err) res.send(err);
            done(null, user);
          });
        }
      });
    }
  )
);

module.exports = passport;
