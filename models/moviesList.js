const fs = require("fs");
const path = require("path");
//doc data tu json

const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "movieList.json"
);

const getMoviesFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (!err) {
      cb(JSON.parse(fileContent));
    } else cb([]);
  });
};

module.exports = class MoviesList {
  static fetchAll(cb) {
    getMoviesFromFile(cb);
  }
};
