import Product from "../models/Product.js";

// Generate Product ID
const generateProductId = async () => {
  const lastProduct = await Product.findOne().sort({ createdAt: -1 });
  const lastNum = lastProduct
    ? parseInt(lastProduct.productId.replace("PRD-", ""))
    : 0;
  return `PRD-${String(lastNum + 1).padStart(3, "0")}`;
};

// CREATE
export const createProduct = async (req, res) => {
  try {
    const productId = await generateProductId();
    const product = await Product.create({ ...req.body, productId });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// READ ALL
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ READ SINGLE PRODUCT BY productId (IMPORTANT)
export const getProductByProductId = async (req, res) => {
  try {
    const product = await Product.findOne({
      productId: req.params.productId
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
