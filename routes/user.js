const express = require("express");
const router = express.Router();

//import sayHi function from controller/user
const { signup, signin, signout } = require("../controllers/user");
const { userSignupValidator } = require("../validator/index");

//use imported function to make request
router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);

module.exports = router;
