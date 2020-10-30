const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById, addOrderToUserHistory } = require("../controllers/user");
const { create, listOrders } = require("../controllers/order");
const { updateStockAndSoldQty } = require("../controllers/product");

router.post(
  "/order/create/:userId",
  requireSignin,
  isAuth,
  addOrderToUserHistory,
  updateStockAndSoldQty,
  create
);

router.get("/order/list/:userId", requireSignin, isAuth, isAdmin, listOrders);

router.param("userId", userById);

module.exports = router;
