// routes/cocktail.js
var express = require("express");
var router = express.Router();
var Cocktail = require("../models/Cocktail");
var Ingredient = require("../models/Ingredient");
var Thema = require("../models/Thema");

// 칵테일에 재료, 테마 추가
router.get("/select", async function (req, res) {
  var cocktails = await Cocktail.find({});
  var ingredients = await Ingredient.find({});
  var themas = await Thema.find({});

  res.render("cocktails/select", { cocktails: cocktails, ingredients: ingredients, themas: themas });
});

router.get("/select/result", function (req, res) {
  Cocktail.findOneAndUpdate(
    { name: req.query.cocktail },
    { $set: { ingredient: req.query.ingredient, thema: req.query.thema } },
    function (err, cocktail) {
      // console.log(cocktail);
      res.redirect("/cocktails");
    }
  );
});

// 테마에 칵테일 추가
router.get("/insert", function (req, res) {
  Cocktail.find({}, function (err, cocktails) {
    Thema.find({}, function (err, themas) {
      res.render("cocktails/insert", { cocktails: cocktails, themas: themas });
    });
  });
});
router.get("/insert/result", function (req, res) {
  Thema.findOneAndUpdate({ name: req.query.name }, { $set: { cocktail: req.query.cocktail } }, function (err, thema) {
    res.redirect("/cocktails");
  });
});

// Home(칵테일 전체보기 + 검색결과)
router.get("/", function (req, res) {
  var searchQuery = createSearchQuery(req.query);

  // 가나다순 정렬
  Cocktail.find(searchQuery)
    .populate("ingredient")
    .populate("thema")
    .sort("name")
    .exec(function (err, cocktails) {
      if (err) res.send(err);
      // console.log(cocktails);
      res.render("cocktails/index", { cocktails: cocktails });
      // res.send(cocktails);
    });
});

// Show(클릭시 -> 칵테일 상세보기)
router.get("/:id", function (req, res) {
  Cocktail.findOne({ _id: req.params.id }, function (err, cocktail) {
    if (err) res.send(err);
    res.render("cocktails/show", { cocktail: cocktail });
  });
});

// New(칵테일 추가 -> 체크용)
router.post("/new", function (req, res) {
  req.body.recommend = Boolean(req.body.recommend);
  req.body.sprite = Boolean(req.body.sprite);
  req.body.alchohol = parseInt(req.body.alchohol);
  req.body.sweet = parseInt(req.body.sweet);
  req.body.sour = parseInt(req.body.sour);
  req.body.bitter = parseInt(req.body.bitter);

  Cocktail.create(req.body, function (err, cocktail) {
    if (err) res.send(err);
    // console.log(cocktail);
    res.redirect("/");
  });
});

// New(재료 추가 -> 체크용)
router.post("/newingredient", function (req, res) {
  Ingredient.create(req.body, function (err, ingredient) {
    if (err) res.send(err);
    // console.log(ingredient);
    res.redirect("/");
  });
});

// New(테마 추가 -> 체크용)
router.post("/newthema", function (req, res) {
  Thema.create(req.body, function (err, thema) {
    if (err) res.send(err);
    // console.log(thema);
    res.redirect("/");
  });
});

// 검색쿼리함수
function createSearchQuery(query) {
  var searchQuery = {};
  var postQuery = [];

  // 첫번째 nav : 메뉴이름 검색
  if (query.searchBy && query.searchBy.length >= 2) {
    postQuery.push({ name: { $regex: new RegExp(query.searchBy), $options: "i" } });
  }
  // 두번째 nav : 상세 맛 검색
  else {
    if (query.alchohol) postQuery.push({ alchohol: { $gte: query.alchohol } });
    if (query.sprite) postQuery.push({ sprite: query.sprite });
    if (query.sweet) postQuery.push({ sweet: query.sweet });
    if (query.sour) postQuery.push({ sour: query.sour });
    if (query.bitter) postQuery.push({ bitter: query.bitter });
    // if (query.recommend) postQuery.push({ recommend: query.recommend });
  }

  if (postQuery.length > 0) {
    searchQuery = { $and: postQuery };
  }

  console.log("searchQuery :", searchQuery);
  return searchQuery;
}

module.exports = router;
