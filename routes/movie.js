const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movie");
const genresController = require("../controllers/genres");
const mediaController = require("../controllers/mediaType");
const auth = require("../middleware/authToken");

//GET trending movie
router.get(
  "/trending/:token",
  auth.authToken,
  movieController.getTrendingMovies
);

//GET rating movie
router.get(
  "/top-rate/:token",
  auth.authToken,
  movieController.getTopRatingMovies
);

//GET movie base on genre
router.get(
  "/discover/:genreId/:token",
  auth.authToken,
  movieController.getGenreMovies
);

//POST trailer movie
router.post("/video/:token", auth.authToken, movieController.getTrailerMovie);

//POST search movie
router.post("/search/:token", auth.authToken, movieController.getSearchMovie);

//GET all genres
router.get("/genres/:token", auth.authToken, genresController.getGenresList);

//GET all mediaType
router.get(
  "/media-types/:token",
  auth.authToken,
  mediaController.getMediaTypeList
);

module.exports = router;
