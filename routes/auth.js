import express from "express";
import auth from "../middleware/auth.js";

import {
  register,
  login,
  getUser,
  updateUser,
  logout,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", auth, logout);
router.get("/user", auth, getUser);
router.put("/user", auth, updateUser);

export default router;
