const MediaTypeList = require("../models/mediaTypeList");
exports.getMediaTypeList = (req, res, next) => {
  MediaTypeList.fetchAll((media) => {
    res.send(media);
  });
};
