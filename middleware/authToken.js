const userToken = require("../models/userToken");

exports.authToken = (req, res, next) => {
  userToken.fetchAll((users, error) => {
    const token = req.params.token;
    if (error) {
      return next(error);
    } else {
      if (users.find((user) => user.token === token)) {
        return next();
      } else {
        const err = new Error("Not authorized");
        err.status = 401;
        return next(err);
      }
    }
  });
};
