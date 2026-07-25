import express from "express";
import authmiddleware from "../middleware/authmiddleware.js";
import {
    createTransaction,
    getAllTransactions,
    updateTransaction,
    deleteTransaction
} from "../controllers/transactioncontrollers.js";

const router = express.Router();

// Create Transaction
router.post("/create", authmiddleware, createTransaction);

// Get All Transactions
router.get("/", authmiddleware, getAllTransactions);

// Update Transaction
router.put("/:id", authmiddleware, updateTransaction);

// Delete Transaction
router.delete("/:id", authmiddleware, deleteTransaction);

export default router;