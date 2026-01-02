import mongoose from "mongoose";
import GlobalProduct from "../models/GlobalProduct.js";

// ➕ CREATE
export const createGlobalProduct = async (req, res) => {
  try {
    const product = await GlobalProduct.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 📥 GET ALL
export const getGlobalProducts = async (req, res) => {
  try {
    const products = await GlobalProduct.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📥 GET SINGLE (supports productId OR _id)
export const getGlobalProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = mongoose.Types.ObjectId.isValid(id)
      ? await GlobalProduct.findById(id)
      : await GlobalProduct.findOne({ productId: id });

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✏️ UPDATE
export const updateGlobalProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const filter = mongoose.Types.ObjectId.isValid(id)
      ? { _id: id }
      : { productId: id };

    const updatedProduct = await GlobalProduct.findOneAndUpdate(filter, req.body, {
      new: true,
    });

    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });

    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 🗑 DELETE
export const deleteGlobalProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const filter = mongoose.Types.ObjectId.isValid(id)
      ? { _id: id }
      : { productId: id };

    const deletedProduct = await GlobalProduct.findOneAndDelete(filter);

    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
