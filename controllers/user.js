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
};

exports.signin = (req, res) => {
  //find the user based on email

  //const email = req.body.email;
  //const password = req.body.password;
  const { email, password } = req.body;

  //User.findOne({email:email},...)...
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({ // 400 Bad request error status
        err: "User with this email does not exist. Please signup",
      });
    }
    //if user is found make sure the email and password match
    //create authenticate method in user model
    if (!user.authenticate(password)) { // if password is wrong
      return res.status(401).json({ // 401 unauthorized error status
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
};
