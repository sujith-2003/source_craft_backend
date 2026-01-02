import Order from "../models/Order.js";
import mongoose from "mongoose";

/* ================= CREATE ORDER ================= */
export const createOrder = async (req, res) => {
  try {
    if (!req.body.orderId) {
      return res.status(400).json({ message: "Order ID is required" });
    }

    const existingOrder = await Order.findOne({
      orderId: req.body.orderId,
    });

    if (existingOrder) {
      return res
        .status(400)
        .json({ message: "Order with this ID already exists" });
    }

    const order = new Order(req.body);
    await order.save();

    res.status(201).json(order);
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(400).json({ message: err.message });
  }
};

/* ================= GET ALL ORDERS ================= */
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ orderDate: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: err.message });
  }
};

/* ================= GET ORDER BY ID ================= */
export const getOrderById = async (req, res) => {
  try {
    const id = req.params.id;
    let order = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      order = await Order.findById(id);
    }

    if (!order) {
      order = await Order.findOne({ orderId: id });
    }

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    console.error("Error fetching order:", err);
    res.status(500).json({ message: err.message });
  }
};

/* ================= UPDATE ORDER STATUS ================= */
export const updateOrderStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { status, orderStatus } = req.body;
    const newStatus = status || orderStatus;

    if (!newStatus) {
      return res.status(400).json({ message: "Status is required" });
    }

    let order = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      order = await Order.findByIdAndUpdate(
        id,
        { status: newStatus },
        { new: true }
      );
    }

    if (!order) {
      order = await Order.findOneAndUpdate(
        { orderId: id },
        { status: newStatus },
        { new: true }
      );
    }

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    console.error("Error updating order status:", err);
    res.status(400).json({ message: err.message });
  }
};

/* ================= DELETE OLD ORDERS ================= */
export const clearOldOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ orderDate: -1 });
    const keep = orders.slice(0, 10).map((o) => o._id);

    await Order.deleteMany({ _id: { $nin: keep } });

    const remainingOrders = await Order.find().sort({ orderDate: -1 });
    res.json(remainingOrders);
  } catch (err) {
    console.error("Error clearing old orders:", err);
    res.status(500).json({ message: err.message });
  }
};

/* ================= GET ORDERS BY USER ID ================= */
export const getOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId }).sort({ orderDate: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders by user ID:", err);
    res.status(500).json({ message: err.message });
  }
};
