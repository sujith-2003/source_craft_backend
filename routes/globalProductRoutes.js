import express from "express";
import {
  createGlobalProduct,
  getGlobalProducts,
  getGlobalProductById,
  updateGlobalProduct,
  deleteGlobalProduct
} from "../controllers/globalProductController.js";

const router = express.Router();

router.post("/", createGlobalProduct);
router.get("/", getGlobalProducts);
router.get("/:id", getGlobalProductById);
router.put("/:id", updateGlobalProduct);
router.delete("/:id", deleteGlobalProduct);

export default router;
