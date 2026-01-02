import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  originalPrice: Number,
  image: String,
  modelName: String,
  modelColor: String,
  modelSize: String,
  quantity: { type: Number, min: 1, max: 10, default: 1 },
  productCategory: String,
  productSubCategory: String
});

const cartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    items: [cartItemSchema]
  },
  { timestamps: true }
);

export default mongoose.model('Cart', cartSchema);
