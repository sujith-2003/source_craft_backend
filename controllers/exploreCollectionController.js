import Product from "../models/Product.js"; // change require to import

// ➕ Add product (Admin)
const addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📦 Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📦 Get products by category
const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({
      productCategory: new RegExp(`^${category}$`, "i"),
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📦 Get single product
const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      productId: req.params.productId,
    });
    if (!product) return res.status(404).json({ message: "Not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= Export =================
export { addProduct, getAllProducts, getProductsByCategory, getProductById };
