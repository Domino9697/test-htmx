var express = require("express");
var router = express.Router();
const { MovieModel } = require("../models/movie");

router.get("/", async function (req, res) {
  const movies = await MovieModel.find({}).limit(20);

  res.render("movies", {
    movies,
  });
});

router.get("/list", async function (req, res) {
  const page = parseInt(req.query.page) ?? 0;

  const movies = await MovieModel.find({})
    .skip(page * 20)
    .limit(20);

  res.render("movieList", {
    movies,
    page,
  });
});

router.get("/:movieId", async function (req, res) {
  if (!req.params.movieId) {
    return res
      .status(400)
      .send("Please specify a movie id in the params of the url");
  }

  const movie = await MovieModel.findOne({ _id: req.params.movieId });

  res.render("movie", {
    movie,
  });
});

module.exports = router;
