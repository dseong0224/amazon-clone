// this is where we define the actions of
// signup : creates new user using required User model from models/user and saves user info without sending the salt and hashed pw for security
// signin : finds the user of the provided email and checkeds for password match - creates webtoken and cookie using user credentials, if pw doesn't match throws error
// signout : clears cookie and throws signout message
// requireSignin : defines method that requires user sign in
// isAuth : defines method that requires user to be authorized to access
// isAdmin : defines method that requires user to be admin to access
const User = require("../models/user");
const jwt = require("jsonwebtoken"); //to generate signed token
const expressJwt = require("express-jwt"); //for authorization check
const { errorHandler } = require("../helpers/dbErrorHandler"); //imports custom error messages created in dberrorhandler

exports.signup = (req, res) => {
  console.log("req.body: ", req.body);
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user,
    });
  });
}; //returns the user info response to the client

exports.signin = (req, res) => {
  //find the user based on email
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        // 400 Bad request error status
        error: "User with this email does not exist. Please signup",
      });
    }
    //if user is found make sure the email and password match
    //create authenticate method in user model
    if (!user.authenticate(password)) {
      // if password is wrong
      return res.status(401).json({
        // 401 unauthorized error status
        error: "Email and password don't match",
      });
    }

    //generate a signed token with user id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    //persist the token as 't' in cookie with expiry date
    res.cookie("t", token, { expire: new Date() + 9999 }); //expire after 9999sec

    //return response with user and token to frontend client
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, email, name, role } });
  });
}; //returns the token + user info (id, name, email, role) response to the client

exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Signout successful" });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"], // added later due to dependency updates
  userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({//403 Forbidden - source user is not allowed to access
      error: "Access denied",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({//403 Forbidden - source user is not allowed to access
      error: "Admin Privilage",
    });
  }
  next();
};
