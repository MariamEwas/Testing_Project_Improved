import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ["income", "expense"], // Restrict to two specific values
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId, // FK referencing Category
      ref: "Category",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now, // Automatically set to current date if not provided
    },
    description: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId, // FK referencing User
      ref: "User",
      required: true,
    },
  });
  
  const Transaction = mongoose.model("Transaction", transactionSchema);
  export default Transaction;
  