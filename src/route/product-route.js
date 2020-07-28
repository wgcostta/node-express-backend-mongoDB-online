const express = require("express");
const router = express.Router();

const ProductsController = require("../app/controller/productController");

router.get("/", ProductsController.getProducts);
router.post("/", ProductsController.postProduct);
router.get("/:id", ProductsController.getProduct);
router.put("/:id", ProductsController.putProduct);
router.delete("/:id", ProductsController.deleteProduct);

module.exports = router;
