// controllers/checkoutController.js
import Checkout from "../models/Checkout.js";

// GET /api/checkout/draft - Get user's draft checkout data
export const getCheckout = async (req, res) => {
  try {
    const userId = req.userId;
    
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    
    const draft = await Checkout.findOne({ 
      userId: userId,
      status: "Draft" 
    });
    
    if (!draft) {
      return res.status(404).json({ message: "No draft checkout found" });
    }
    
    res.json({
      _id: draft._id,
      userId: draft.userId,
      customer: draft.customer || {},
      products: draft.products || [],
      subtotal: draft.subtotal || 0,
      shipping: draft.shipping || 0,
      total: draft.total || 0,
      paymentMethod: draft.paymentMethod || "Online Gateway",
      status: draft.status,
      updatedAt: draft.updatedAt
    });
  } catch (error) {
    console.error("Error fetching checkout draft:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/checkout/draft - Save user's draft checkout data
export const saveCheckout = async (req, res) => {
  try {
    const userId = req.userId;
    
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    
    const {
      customer,
      products,
      subtotal,
      shipping,
      total,
      paymentMethod
    } = req.body;
    
    // Validate required fields
    if (!customer || !Array.isArray(products)) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    
    const draftData = {
      userId,
      customer: customer || {},
      products: products || [],
      subtotal: subtotal || 0,
      shipping: shipping || 0,
      total: total || 0,
      paymentMethod: paymentMethod || "Online Gateway",
      status: "Draft"
    };
    
    const draft = await Checkout.findOneAndUpdate(
      { userId, status: "Draft" },
      draftData,
      { 
        new: true, 
        upsert: true,
        runValidators: true
      }
    );
    
    res.json({
      _id: draft._id,
      userId: draft.userId,
      customer: draft.customer,
      products: draft.products,
      subtotal: draft.subtotal,
      shipping: draft.shipping,
      total: draft.total,
      paymentMethod: draft.paymentMethod,
      status: draft.status,
      updatedAt: draft.updatedAt
    });
  } catch (error) {
    console.error("Error saving checkout draft:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// DELETE /api/checkout/draft - Clear user's draft checkout data
export const deleteCheckout = async (req, res) => {
  try {
    const userId = req.userId;
    
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    
    const result = await Checkout.findOneAndDelete({ 
      userId, 
      status: "Draft" 
    });
    
    if (!result) {
      return res.status(404).json({ message: "No draft checkout found to delete" });
    }
    
    res.json({ 
      message: "Checkout draft deleted successfully",
      deletedId: result._id 
    });
  } catch (error) {
    console.error("Error deleting checkout draft:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/checkout/cart - Get cart items
export const getCartItems = async (req, res) => {
  try {
    const userId = req.userId;
    
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    
    // Find draft to get cart items
    const draft = await Checkout.findOne({ 
      userId, 
      status: "Draft" 
    });
    
    if (!draft) {
      return res.json([]);
    }
    
    res.json(draft.products || []);
  } catch (error) {
    console.error("Error getting cart items:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/checkout/razorpay-order - Create Razorpay order
export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount, currency = "INR" } = req.body;
    
    // Create Razorpay order (placeholder)
    const razorpayOrder = {
      id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      amount: amount * 100, // Convert to paise
      currency: currency,
      status: "created"
    };
    
    res.json(razorpayOrder);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/checkout/place-order - Place order
export const placeOrder = async (req, res) => {
  try {
    const userId = req.userId;
    
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    
    const orderData = req.body;
    
    // Find draft and convert to order
    const draft = await Checkout.findOne({ userId, status: "Draft" });
    
    if (!draft) {
      return res.status(404).json({ message: "No draft found to place order" });
    }
    
    const order = await Checkout.findOneAndUpdate(
      { _id: draft._id },
      {
        ...orderData,
        status: "Placed",
        orderDate: new Date(),
        orderStatus: "Processing",
        trackingNumber: `TRK${Date.now()}${Math.floor(Math.random() * 1000)}`,
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      },
      { new: true }
    );
    
    res.json({
      _id: order._id,
      orderId: orderData.orderId || order._id.toString(),
      customer: order.customer,
      products: order.products,
      subtotal: order.subtotal,
      shipping: order.shipping,
      total: order.total,
      paymentMethod: order.paymentMethod,
      status: order.status,
      orderDate: order.orderDate,
      orderStatus: order.orderStatus,
      trackingNumber: order.trackingNumber,
      estimatedDelivery: order.estimatedDelivery
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Server error" });
  }
};