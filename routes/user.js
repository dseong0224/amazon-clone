const express = require("express");
const router = express.Router();

//import sayHi function from controller/user
const { sayHi } = require("../controllers/user");

//use imported function to make request
router.get("/", sayHi);

module.exports = router;
