import Express from "express";
import { signUp, loginUser } from "../controllers/userControllers.js";

const router = Express.Router();

//Sign up Users
router.post("/", signUp);

//Login Users
router.post("/", loginUser);

// //Get the loggedIn Users profile
// router.get("/api/users/profile", loggedUserProfile);

// //Get all Users(admin only)
// router.get("/api/admin/users" getAllAdminUsers);

// //Delete own Profile
// router.delete("/api/users/delete", DeleteOwnProfile)

export default router;
