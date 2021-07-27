const mongoose = require("mongoose");

const GenreSchema = new mongoose.Schema({
  name: { type: String },
  tmdbId: { type: String },
});

const GenreModel = mongoose.model("GenreModel", GenreSchema, "genres");

module.exports = { GenreModel };
