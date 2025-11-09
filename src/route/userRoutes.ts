import Express from "express";
import {
  signUp,
  login,
  profile,
  getAllUsers,
  DeleteOwnProfile,
} from "../controllers/userControllers.js";
import { restrictedTo, protect } from "../middlewares/authMiddleware.js";

const router = Express.Router();

// User authentication routes
router.post("/signUp", signUp);
router.post("/login", login);
router.get("/profile", protect, profile);
router.get("/users", protect, restrictedTo("admin"), getAllUsers);
router.delete("/delete", protect, DeleteOwnProfile);

export default router;
