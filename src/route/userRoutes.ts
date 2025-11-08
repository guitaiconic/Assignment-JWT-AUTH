import Express from "express";
import {
  signUp,
  login,
  profile,
  getAllUsers,
} from "../controllers/userControllers.js";
import { restrictedTo, protect } from "../middlewares/authMiddleware.js";

const router = Express.Router();

// User authentication routes
router.post("/signUp", signUp);
router.post("/login", login);
router.get("/profile", protect, profile);
router.get("/users", restrictedTo("admin"), getAllUsers);
// router.delete("/api/users/delete", DeleteOwnProfile)

export default router;
