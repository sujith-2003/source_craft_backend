import mongoose from "mongoose";

const ModelSchema = new mongoose.Schema({
  name: String,
  color: String,
  currentPrice: Number,
  originalPrice: Number,
  offer: String,
});

const ProductSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true, unique: true },
    productName: { type: String, required: true },
    productCategory: { type: String, required: true },
    productSubCategory: { type: String },
    composition: { type: String },
    images: [{ type: String }],
    models: [ModelSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
