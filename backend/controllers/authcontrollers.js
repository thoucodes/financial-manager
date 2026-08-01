import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register User
export const register = async (req, res) => {
    try {
        const {fullname, email, password} = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
                success: false,
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            fullname, 
            email, 
            password: hashedPassword,
        });
        await user.save();

        res.status(201).json({
            message: "User registered successfully",
            success: true,
        });
    } catch (error) {
        console.error("REGISTRATION ERROR:", error);
        res.status(500).json({
            message: "Error registering user",
            success: false,
        });
    }
};

// Login User
export const login = async (req, res) => {
    try{
        const {email, password} = req.body;

        // Check if user exists
        const user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({
                message: "Invalid email or password",
                success: false,
            });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                message: "Invalid email or password",
                success: false,
            });
        }
        
const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
);
        res.status(200).json({
            message: "Login successful",
            success: true,
            token,
        });

    } catch (error) {
        //console.error("LOGIN ERROR:", error);
        res.status(500).json({
            message: "Error logging in user",
            success: false,
        });
    }
};

// Get Logged-in User
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Update Name
export const updateName = async (req, res) => {
    try {
        const { fullname } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { fullname },
            { new: true }
        ).select("-password");

        res.status(200).json({
            success: true,
            message: "Name updated successfully",
            user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Change Password
export const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        const user = await User.findById(req.user.id);

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Old password is incorrect",
            });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password changed successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};