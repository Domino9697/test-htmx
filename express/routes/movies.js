var express = require("express");
var router = express.Router();
const { MovieModel } = require("../models/movie");

/* GET movies listing. */
router.get("/", async function (req, res) {
  const movies = await MovieModel.find({});

  res.render("movies", {
    movies,
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
