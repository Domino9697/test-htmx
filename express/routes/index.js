var express = require("express");
var router = express.Router();
const { MovieModel } = require("../models/movie");

/* GET home page. */
router.get("/", async function (req, res) {
  const movies = await MovieModel.find({}).limit(20);

  res.render("home", {
    movies,
  });
});

module.exports = router;
