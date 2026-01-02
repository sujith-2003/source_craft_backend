import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  clearOldOrders,
  getOrdersByUserId,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/user/:userId", getOrdersByUserId);
router.get("/:id", getOrderById);
router.put("/:id", updateOrderStatus);
router.put("/:id/status", updateOrderStatus);
router.delete("/clear-old", clearOldOrders);

export default router;
