import ShippingAddress from "../models/ShippingAddress.js";

// ================= GET SHIPPING ADDRESS =================
export const getShippingAddress = async (req, res) => {
  try {
    const address = await ShippingAddress.findOne({
      userId: req.user.userId
    });

    res.json(address);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= SAVE / UPDATE SHIPPING ADDRESS =================
export const saveShippingAddress = async (req, res) => {
  try {
    const userId = req.user.userId;
    const data = req.body;

    const address = await ShippingAddress.findOneAndUpdate(
      { userId },
      { ...data, userId },
      { new: true, upsert: true }
    );

    res.json(address);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ================= DELETE SHIPPING ADDRESS =================
export const deleteShippingAddress = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const deletedAddress = await ShippingAddress.findOneAndDelete({
      userId: req.user.userId
    });

    if (!deletedAddress) {
      return res.status(404).json({ message: "Shipping address not found" });
    }

    res.json({ message: "Shipping address deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};