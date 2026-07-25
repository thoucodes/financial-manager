import mongoose from "mongoose";

const transactionschema= new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
     type:{
        type:String,
        required:true,
        enum:["income","expense"],
    },
    category:{
        type:String,
        required:true,
        enum:["Food", "Transport", "Shopping",  "Medical", "Education", "Salary", "Scholarship", "Others",],
    },
    description:{
        type:String,
    },
    amount:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    }
}, {
    timestamps: true
});

const Transaction = mongoose.model("Transaction", transactionschema);

export default Transaction;