const express = require("express");
const orderController = require("../Controllers/orderController");

const router = express.Router();

router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getOrderById);
router.get("/getProductsByOrder/:id", orderController.getProductsByOrderId);
router.get(
  "/getMyPastOrders/:customerId",
  orderController.getPastOrdersByCustomerId
);

module.exports = router;
