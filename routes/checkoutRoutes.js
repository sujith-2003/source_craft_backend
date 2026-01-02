// routes/checkoutRoutes.js
import express from "express";
import {
  getCheckout,
  saveCheckout,
  deleteCheckout,
  getCartItems,
  createRazorpayOrder,
  placeOrder
} from "../controllers/checkoutController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Apply auth middleware to ALL checkout routes
router.use(auth);

// Draft checkout endpoints
router.get("/draft", getCheckout);
router.post("/draft", saveCheckout);
router.delete("/draft", deleteCheckout);

// Cart endpoints
router.get("/cart", getCartItems);

// Payment endpoints
router.post("/razorpay-order", createRazorpayOrder);
router.post("/place-order", placeOrder);

export default router;