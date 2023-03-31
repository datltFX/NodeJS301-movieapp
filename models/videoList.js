const fs = require("fs");
const path = require("path");
//doc data tu json

const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "videoList.json"
);

const getVideosFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (!err) {
      cb(JSON.parse(fileContent));
    } else cb([]);
  });
};

module.exports = class VideosList {
  static fetchAll(cb) {
    getVideosFromFile(cb);
  }
};
