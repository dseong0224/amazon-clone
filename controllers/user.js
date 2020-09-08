const User = require("../models/user");

//method that takes in the id of user and if exists, sends a user profile based on the request
exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    //uses findById method of User to find user given the id
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = user;
    next();
  });
};

exports.read = (req, res) => {
  // console.log("req.profile: ", req.profile)
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

exports.update = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "Not authorized to perform action",
        });
      }
      user.hashed_password = undefined;
      user.salt = undefined;
      res.json(user);
    }
  );
};
