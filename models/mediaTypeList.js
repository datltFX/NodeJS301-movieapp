const fs = require("fs");
const path = require("path");
//doc data tu json

const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "mediaTypeList.json"
);

const getMediaTypeFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (!err) {
      cb(JSON.parse(fileContent));
    } else cb([]);
  });
};

module.exports = class MediaTypeList {
  static fetchAll(cb) {
    getMediaTypeFromFile(cb);
  }
};
