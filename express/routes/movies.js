var express = require("express");
var viewRouter = express.Router();
var apiRouter = express.Router();
const { getMovieList, getMovie } = require("../services/movies");

viewRouter.get("/", async function (req, res) {
  const movies = await getMovieList(0);

  res.render("movies", {
    movies,
  });
});

viewRouter.get("/list", async function (req, res) {
  const page = parseInt(req.query.page) ?? 0;

  const movies = await getMovieList(page);

  res.render("movieList", {
    movies,
    page,
  });
});

apiRouter.get("/list", async function (req, res) {
  const page = parseInt(req.query.page) ?? 0;

  const movies = await getMovieList(page);

  res.json(movies);
});

viewRouter.get("/:movieId", async function (req, res) {
  if (!req.params.movieId) {
    return res
      .status(400)
      .send("Please specify a movie id in the params of the url");
  }

  const movie = await getMovie(req.params.movieId);

  res.render("movie", {
    movie,
  });
});

apiRouter.get("/:movieId", async function (req, res) {
  if (!req.params.movieId) {
    return res
      .status(400)
      .send("Please specify a movie id in the params of the url");
  }

  const movie = await getMovie(req.params.movieId);

  res.json(movie);
});

module.exports = { viewRouter, apiRouter };
