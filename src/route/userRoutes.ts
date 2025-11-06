import Express from "express";
import { signUp, login, profile } from "../controllers/userControllers.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Express.Router();

// User authentication routes
router.post("/signUp", signUp);
router.post("/login", login);
router.get("/profile", protect, profile);
// router.get("/api/admin/users" getAllAdminUsers);
// router.delete("/api/users/delete", DeleteOwnProfile)

export default router;
