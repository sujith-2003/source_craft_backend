import mongoose from "mongoose";

const ModelSchema = new mongoose.Schema({
  name: String,
  size: String,
  color: String,
  oldPrice: Number,
  currentPrice: { type: Number, required: true },
  offer: String
});

const ProductSchema = new mongoose.Schema(
  {
    productId: { type: String, unique: true },
    productName: { type: String, required: true },
    productCategory: { type: String, required: true },
    productSubCategory: String,
    productDescription: String,
    composition: String,
    images: [String], // base64 or Cloudinary URLs
    models: [ModelSchema]
  },
  { timestamps: true }
);

// ✅ Export as default for ES Module import
export default mongoose.model("Product", ProductSchema);
