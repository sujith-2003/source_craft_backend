import Cart from '../models/Cart.js';

/* ================= GET CART ================= */
export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = await Cart.create({ userId, items: [] });
    }

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= ADD TO CART ================= */
export const addToCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const { item } = req.body;

    if (!item) {
      return res.status(400).json({ message: 'Item required' });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, items: [] });

    const index = cart.items.findIndex(
      (i) =>
        i.productId === item.productId &&
        i.modelName === item.modelName &&
        i.modelColor === item.modelColor
    );

    if (index > -1) {
      cart.items[index].quantity = Math.min(
        10,
        cart.items[index].quantity + item.quantity
      );
    } else {
      cart.items.push(item);
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= UPDATE ITEM ================= */
export const updateCartItem = async (req, res) => {
  try {
    const { userId, itemId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = cart.items.id(itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    item.quantity = Math.max(1, Math.min(10, quantity));
    await cart.save();

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= REMOVE ITEM ================= */
export const removeFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(
      (i) => i._id.toString() !== itemId
    );

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= CLEAR CART ================= */
export const clearCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId });
    if (cart) {
      cart.items = [];
      await cart.save();
    }

    res.status(200).json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
