const { MovieModel } = require("../models/movie");

const getMovie = (movieId) => MovieModel.findOne({ _id: movieId });

const getMovieList = (page) =>
  MovieModel.find({})
    .skip(page * 1000)
    .limit(1000);

module.exports = {
  getMovie,
  getMovieList,
};
