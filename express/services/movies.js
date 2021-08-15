const { MovieModel } = require("../models/movie");

const getMovie = (movieId) => MovieModel.findOne({ _id: movieId });

const getMovieList = (page) =>
  MovieModel.find({})
    .skip(page * 20)
    .limit(20);

module.exports = {
  getMovie,
  getMovieList,
};
