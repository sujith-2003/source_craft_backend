import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
  image: String,
});

const CustomerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  address: String,
  address2: String,
  city: String,
  state: String,
  postcode: String,
  _id: String, // customer reference id
});

const OrderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    customer: CustomerSchema,
    products: [ProductSchema],
    subtotal: Number,
    shipping: Number,
    total: Number,
    paymentMethod: String,
    status: {
      type: String,
      enum: [
        "Processing",
        "Confirmed",
        "Shipped",
        "Out for Delivery",
        "Delivered",
      ],
      default: "Processing",
    },
    trackingNumber: String,
    estimatedDelivery: Date,
    orderDate: { type: Date, default: Date.now },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
