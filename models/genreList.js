const fs = require("fs");
const path = require("path");
//doc data tu json

const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "genreList.json"
);

const getGenreListFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (!err) {
      cb(JSON.parse(fileContent));
    } else cb([]);
  });
};

module.exports = class GenreList {
  static fetchAll(cb) {
    getGenreListFromFile(cb);
  }
};
