import mongoose from "mongoose";

const modelSchema = new mongoose.Schema({
  name: String,
  oldPrice: Number,
  currentPrice: Number,
  offer: String,
  color: String,
});

const globalProductSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true, unique: true },
    productName: String,
    productCategory: String,
    productSubCategory: String,
    productDescription: String,
    composition: String,
    images: [String],
    models: [modelSchema],
  },
  { timestamps: true }
);

// ✅ Export default for ES Module
export default mongoose.model("GlobalProduct", globalProductSchema);
