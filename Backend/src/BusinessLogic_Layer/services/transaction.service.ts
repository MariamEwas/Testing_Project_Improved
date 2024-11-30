// transaction.service.ts
import mongoose from "mongoose";
import Transaction from '../../Database_Layer/models/transaction.schema';
import Budget from '../../Database_Layer/models/budget.schema';

class TransactionService {

  constructor(){};

  static async getAllTransactions(userId: string) {
//    console.log(userId);
   const tr = await Transaction.find({ userId }).populate("category");
//    console.log(tr);
   return tr  ;

  }



   static async getTransactionById(id: string, userId: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid transaction ID");
    }

    const transaction = await Transaction.findOne({ _id: id, userId }).populate("category");
    if (!transaction) throw new Error("Transaction not found");
    return transaction;
  }




  static async addTransaction(transactionData: any) {
    const { type, category, amount, userId } = transactionData;

    if (!mongoose.Types.ObjectId.isValid(category)) {
      throw new Error("Invalid category ID");
    }

    // Check budget and update spent if type is "expense"
    if (type === "expense") {
      const budget = await Budget.findOne({ category, userId });
      if (!budget) throw new Error("No budget found for this category");
      if (budget.spent + amount > budget.limit) throw new Error("Budget limit exceeded");

      // Update spent in budget
      budget.spent += amount;
      await budget.save();
    }

    // Create the transaction
    return await Transaction.create(transactionData);
  }




  static async deleteTransaction(id: string, userId: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid transaction ID");
    }

    const transaction = await Transaction.findOneAndDelete({ _id: id, userId });
    if (!transaction) throw new Error("Transaction not found");

    // Update the budget spent if it's an "expense"
    if (transaction.type === "expense") {
      const budget = await Budget.findOne({ category: transaction.category, userId });
      if (budget) {
        budget.spent -= transaction.amount;
        await budget.save();
      }
    }

    return transaction;
  }



  
//   async updateTransaction(id: string, userId: string, updateData: any) {
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       throw new Error("Invalid transaction ID");
//     }

//     const transaction = await Transaction.findOne({ _id: id, userId });
//     if (!transaction) throw new Error("Transaction not found");

//     const { type, category, amount } = updateData;

//     // Adjust the budget if it's an expense and the amount or category changes
//     if (type === "expense" && (amount !== transaction.amount || category !== transaction.category)) {
//       const oldBudget = await Budget.findOne({ category: transaction.category, userId });
//       const newBudget = await Budget.findOne({ category, userId });

//       if (oldBudget) oldBudget.spent -= transaction.amount;
//       if (newBudget) {
//         if (newBudget.spent + amount > newBudget.limit) throw new Error("Budget limit exceeded");
//         newBudget.spent += amount;
//       }

//       await oldBudget?.save();
//       await newBudget?.save();
//     }

//     return await Transaction.findOneAndUpdate({ _id: id, userId }, updateData, { new: true });
//   }

}

export default TransactionService;
