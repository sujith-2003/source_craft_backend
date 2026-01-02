import express from "express";
import {
  createProduct,
  getProducts,
  getProductByProductId,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";

const router = express.Router();

router.post("/", createProduct);
router.get("/", getProducts);

// ✅ THIS IS WHAT PRODUCT DETAIL PAGE USES
router.get("/:productId", getProductByProductId);

router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
