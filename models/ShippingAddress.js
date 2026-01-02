import mongoose from "mongoose";

const shippingAddressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    street: String,
    area: String,
    city: String,
    state: String,
    pincode: String,
    country: { type: String, default: "India" },
    phone: String
  },
  { timestamps: true }
);
shippingAddressSchema.index({ userId: 1 }, { unique: true });

export default mongoose.model("ShippingAddress", shippingAddressSchema);
