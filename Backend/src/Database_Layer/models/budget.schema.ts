import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema({
   
    category: {
      type: mongoose.Schema.Types.ObjectId, // FK referencing Category
      ref: "Category",
      required: true,
    },

    total_spent: {
      type: Number,
      required: true,
    },

    limit: {
        type: Number,
        required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId, // FK referencing User
      ref: "User",
      required: true,
    },

  });
  
  const Budget = mongoose.model("Budget", BudgetSchema);
  export default Budget;
  