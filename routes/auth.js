const express = require("express");
const router = express.Router();

//import sayHi function from controller/user
const {
  signup,
  signin,
  signout,
  requireSignin,
} = require("../controllers/auth");
const { userSignupValidator } = require("../validator/index");

//use imported function to make request
router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);

//example of how to restrict routes
// router.get("/hello", requireSignin, (req, res) => {
//   res.send("hello there");
// });

module.exports = router;
