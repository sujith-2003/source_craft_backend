import express from "express";
import {
  addProduct,
  getAllProducts,
  getProductsByCategory,
  getProductById,
} from "../controllers/ExploreCollectioncontroller.js";

const router = express.Router();

// Admin: Add product
router.post("/", addProduct);

// Get all products
router.get("/", getAllProducts);

// Get products by category
router.get("/category/:category", getProductsByCategory);

// Get single product
router.get("/:productId", getProductById);

export default router;
