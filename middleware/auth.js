// middleware/auth.js
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if authorization header exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Access denied. No token provided.",
      });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Access denied. No token provided.",
      });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_jwt_secret"
    );

    // Extract user ID from various possible token formats
    const userId =
      decoded.userId ||
      decoded.id ||
      decoded._id ||
      decoded?.user?.id ||
      decoded?.user?._id;

    if (!userId) {
      return res.status(401).json({
        message: "Invalid token: User ID missing",
      });
    }

    // Set both for compatibility
    req.userId = userId;
    req.user = { 
      id: userId,
      userId: userId,
      _id: userId
    };

    next();
  } catch (error) {
    // Handle specific JWT errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expired. Please login again.",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Invalid token. Please login again.",
      });
    }

    console.error("Auth middleware error:", error.message);
    return res.status(401).json({
      message: "Invalid token. Please login again.",
    });
  }
};

export default auth;