import Transaction from "../models/transaction.js";

export const createTransaction = async (req, res) => {
    try {
        const { type, category, description, amount, date } = req.body;

        if (!type || !category || !description || !amount) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        
        const transaction = new Transaction({
            user: req.user.id,
            type,
            category,
            description,
            amount,
            date,
        });

        await transaction.save();

        res.status(201).json({
            success: true,
            message: "Transaction added successfully",
            transaction,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({
            user: req.user.id,
        }).sort({ date: -1, createdAt: -1 });

        res.status(200).json({
            success: true,
            transactions,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found",
            });
        }

        if (transaction.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Access denied",
            });
        }

        const updatedTransaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Transaction updated successfully",
            transaction: updatedTransaction,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found",
            });
        }

        if (transaction.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Access denied",
            });
        }

        await Transaction.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Transaction deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};