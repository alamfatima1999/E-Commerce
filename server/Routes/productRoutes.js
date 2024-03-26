const express = require("express");
const productController = require("../Controllers/productController");

const router = express.Router();

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.get("/getOrdersByProduct/:id", productController.getOrdersByProduct);
router.post("/create", productController.createProduct);
router.post("/update", productController.updateProduct);
router.delete("/delete/:id", productController.deleteProduct);

module.exports = router;
