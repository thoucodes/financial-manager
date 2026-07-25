import express from "express";
import { register, login, getMe, updateName, changePassword } from "../controllers/authcontrollers.js";
import authmiddleware from "../middleware/authmiddleware.js";

const router = express.Router();


// Register User
router.post("/register", register);

// Login User
router.post("/login", login);

// Get Logged-in User Info
router.get("/me", authmiddleware, getMe);

// Update Name
router.put("/update-name", authmiddleware, updateName);

// Change Password
router.put("/change-password", authmiddleware, changePassword);

export default router;