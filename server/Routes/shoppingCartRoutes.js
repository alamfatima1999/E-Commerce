const express = require("express");
const shoppingCartController = require("../Controllers/shoppingCartController");
const router = express.Router();

router.get("/:customerId", shoppingCartController.getShoppingCart);
router.post("/addProduct", shoppingCartController.addToCart);
router.post("/buy", shoppingCartController.buy);
router.delete(
  "/removeFromCart/:productId/:customerId",
  shoppingCartController.removeFromCart
);

module.exports = router;
