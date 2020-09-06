const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

const { userById } = require("../controllers/user");

// takes in the requested user object from controller and saves profile as user and send it to client as json
router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.profile,
  });
});

//use imported userById function to make request
router.param("userId", userById);

module.exports = router;
