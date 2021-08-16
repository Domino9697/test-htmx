var express = require("express");
var router = express.Router();
const { getMovieList } = require("../services/movies");

/* GET home page. */
router.get("/", async function (req, res) {
  const movies = await getMovieList(0);

  res.render("home", {
    movies,
  });
});

module.exports = router;
