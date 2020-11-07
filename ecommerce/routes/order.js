const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById, addOrderToUserHistory } = require("../controllers/user");
const {
  create,
  listOrders,
  getOrderStatusOptions,
  orderById,
  updateOrderStatus,
} = require("../controllers/order");
const { updateStockAndSoldQty } = require("../controllers/product");
const { orderBy } = require("lodash");

router.post(
  "/order/create/:userId",
  requireSignin,
  isAuth,
  addOrderToUserHistory,
  updateStockAndSoldQty,
  create
);

router.get("/order/list/:userId", requireSignin, isAuth, isAdmin, listOrders);

router.get(
  "/order/statusOptions/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  getOrderStatusOptions
);

router.put(
  "/order/:orderId/status/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  updateOrderStatus
);

router.param("userId", userById);
router.param("orderId", orderById);

module.exports = router;
