const axios = require("axios");
const mongoose = require("mongoose");
const { MovieModel } = require("../models/movie");
const { GenreModel } = require("../models/genre");

async function fetchGenres() {
  const response = await axios.get(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=522d421671cf75c2cba341597d86403a"
  );

  const fetchedGenres = response.data.genres;

  for (const genre of fetchedGenres) {
    const newGenre = new GenreModel({
      name: genre.name,
      tmdbId: genre.id,
    });

    await newGenre.save();
  }
}

async function fetchPage(page) {
  const response = await axios.get(
    "https://api.themoviedb.org/3/movie/popular?api_key=522d421671cf75c2cba341597d86403a&page=" +
      String(page)
  );
  const moviesFetched = response.data.results;

  for (const movie of moviesFetched) {
    const genreIds = [];
    for (const genreId of movie.genre_ids) {
      const genre = await GenreModel.findOne({ tmdbId: genreId });
      genreIds.push(genre._id);
    }

    const newMovie = new MovieModel({
      title: movie.title,
      description: movie.overview,
      id_tmdb: movie.id,
      release_date: movie.release_date,
      poster_path: "https://image.tmdb.org/t/p/w342" + movie.poster_path,
      genre_ids: genreIds,
      vo: movie.original_language,
    });

    await newMovie.save();
  }
}

const populateDB = async (pages) => {
  const connection = await mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await MovieModel.collection.drop();
  await GenreModel.collection.drop();

  await fetchGenres();
  for (let pageIndex = 1; pageIndex <= pages; pageIndex++) {
    await fetchPage(pageIndex);
  }

  connection.disconnect();
};

populateDB(100);
