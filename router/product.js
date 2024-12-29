const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const roleMiddleware = require("../middleware/roleMiddleWare");
router.get("/", productController.getAllProducts);
router.use(roleMiddleware(["admin"]));
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
