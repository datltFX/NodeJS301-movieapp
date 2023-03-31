const genresList = require("../models/genreList");
exports.getGenresList = (req, res, next) => {
  genresList.fetchAll((genresList) => res.send(genresList));
};
