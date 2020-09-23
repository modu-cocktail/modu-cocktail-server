// index.js
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var passport = require("passport");
var session = require("express-session");
var app = express();

// DB Setting
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(
  "mongodb+srv://park:park123@cluster0.4bvqg.mongodb.net/everybody_cocktail?retryWrites=true&w=majority"
);
var db = mongoose.connection;
db.once("open", function () {
  console.log("DB Connected");
});
db.on("error", function (err) {
  console.log("DB Error : ", err);
});

// Login setting
app.use(session({ secret: "MySecret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Other settings
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(function (req, res, next) {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.currentUser = req.user;
  console.log(req.user);
  next();
});

// Routes
app.use("/", require("./routes/home"));
app.use("/cocktails", require("./routes/cocktails"));
app.use("/auth", require("./routes/auth"));

// Port setting
var port = 3000;
app.listen(port, function () {
  console.log("Server on! http://localhost:" + port);
});
