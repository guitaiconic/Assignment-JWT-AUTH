import Express from "express";
import { signUp, login } from "../controllers/userControllers.js";

const router = Express.Router();

// User authentication routes
router.post("/signUp", signUp);
router.post("/login", login);
// router.get("/api/users/profile", loggedUserProfile);
// router.get("/api/admin/users" getAllAdminUsers);
// router.delete("/api/users/delete", DeleteOwnProfile)

export default router;
