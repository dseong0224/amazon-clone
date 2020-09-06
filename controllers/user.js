const User = require("../models/user");

//method that takes in the id of user and if exists, sends a user profile based on the request
exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => { //uses findById method of User to find user given the id
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = user;
    next();
  });
};
