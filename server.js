import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// ROUTES (ES MODULE STYLE)
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/productRoutes.js";
import globalProductRoutes from "./routes/globalProductRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import exploreRoutes from "./routes/exploreCollectionRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import checkoutRoutes from "./routes/checkoutRoutes.js";
import shippingRoutes from "./routes/shippingRoutes.js";

dotenv.config();

const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json({ limit: "10mb" }));

/* DATABASE */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

/* ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/global-products", globalProductRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/explore-collections", exploreRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/shipping", shippingRoutes);

/* HEALTH CHECK */
app.get("/", (req, res) => {
  res.send("🚀 API Running Successfully");
});

/* SERVER */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
