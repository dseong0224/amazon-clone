const express = require("express");
const router = express.Router();

//import sayHi function from controller/user
const { signup } = require("../controllers/user");
const { userSignupValidator } = require("../validator/index");

//use imported function to make request
router.post("/signup", userSignupValidator, signup);

module.exports = router;
