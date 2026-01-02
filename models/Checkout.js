// models/Checkout.js
import mongoose from "mongoose";

const checkoutSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      required: true,
      ref: 'User',
      index: true
    },
    customer: {
      type: Object,
      default: {}
    },
    products: {
      type: Array,
      default: []
    },
    subtotal: {
      type: Number,
      default: 0,
      min: 0
    },
    shipping: {
      type: Number,
      default: 0,
      min: 0
    },
    total: {
      type: Number,
      default: 0,
      min: 0
    },
    paymentMethod: {
      type: String,
      default: "Online Gateway",
      enum: ["Cash on Delivery", "Online Gateway"]
    },
    status: { 
      type: String, 
      default: "Draft",
      enum: ["Draft", "Placed"],
      index: true
    },
    // Order details (when status becomes "Placed")
    orderId: String,
    orderDate: Date,
    orderStatus: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"]
    },
    trackingNumber: String,
    estimatedDelivery: Date,
    razorpayOrderId: String,
    razorpayPaymentId: String
  },
  { 
    timestamps: true 
  }
);

// Compound index for faster queries
checkoutSchema.index({ userId: 1, status: 1 });
checkoutSchema.index({ userId: 1, updatedAt: -1 });

export default mongoose.model("Checkout", checkoutSchema);