// transaction.service.ts
import mongoose from "mongoose";
import Transaction from '../../Database_Layer/models/transaction.schema';
import Budget from '../../Database_Layer/models/budget.schema';
import User from '../../Database_Layer/models/user.schema';
import moment from 'moment';


class TransactionService {

  constructor(){};


static async getAllTransactions(userId: string, queryParams: any) {
  // Step 1: Start with the basic filter for the userId
  let filter: Record<string, any> = { userId };  // Explicitly type as Record<string, any>

  // Step 2: Check if the 'date' query parameter exists
  if (queryParams.date) {
    const { date } = queryParams;  // Get the 'date' parameter from the query

    let startDate: Date;  // Variable to store the calculated date

    const currentDate = moment('2019-01-28');  // Set the date to 1st Jan, 2019

    // Step 3: Determine the startDate based on the 'date' parameter
    switch (date) {
      case 'last-week':
        startDate = currentDate.subtract(1, 'week').startOf('week').toDate(); // Get start of last week
        break;
      case 'last-month':
        startDate = currentDate.subtract(1, 'month').startOf('month').toDate(); // Get start of last month
        break;
      case 'last-year':
        startDate = currentDate.subtract(1, 'year').startOf('year').toDate(); // Get start of last year
        break;
      default:
        startDate = currentDate.subtract(1, 'year').startOf('day').toDate(); // Default to last year if no valid date param
    }

    // Step 4: Add the 'date' filter to the filter object
    filter = {
      ...filter,
      date: { $gte: startDate }  // Only get transactions where the date is after the startDate
    };
  }

  // Step 5: Fetch the transactions from the database
  const transactions = await Transaction.find(filter).populate("category");
  
  return transactions;  // Return the filtered transactions
}

  
//   static async getAllTransactions(userId: string) {
// //    console.log(userId);
//    const tr = await Transaction.find({ userId }).populate("category");
// //    console.log(tr);
//    return tr  ;

//   }



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
  
    // Validate the category ID
    if (!mongoose.Types.ObjectId.isValid(category)) {
      throw new Error("Invalid category ID");
    }
  
    if (type === "expense") {
      // Handle expenses
      const budget = await Budget.findOne({ category, userId });
      if (!budget) throw new Error("No budget found for this category");
      if (budget.spent + amount > budget.limit) throw new Error("Budget limit exceeded");
  
      // Update spent in the budget
      budget.spent += amount;
      await budget.save();

    } else if (type === "income") {
      // Handle income
      const user = await User.findById(userId);
      if (!user) throw new Error("User not found");
  
      // Update total_income for the user
      user.total_income = (user.total_income || 0) + amount;
      await user.save();

    } else {
      throw new Error("Invalid transaction type. Must be 'income' or 'expense'.");
    }
  
    // Create the transaction
    return await Transaction.create(transactionData);
  }
  


  static async deleteTransaction(id: string, userId: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid transaction ID");
    }
  
    // Find and delete the transaction
    const transaction = await Transaction.findOneAndDelete({ _id: id, userId });
    if (!transaction) throw new Error("Transaction not found");
  
    if (transaction.type === "expense") {
      // Update the budget spent for expense transactions
      const budget = await Budget.findOne({ category: transaction.category, userId });
      if (budget) {
        budget.spent -= transaction.amount;
        await budget.save();
      }
    } else if (transaction.type === "income") {
      // Update the total_income for income transactions
      const user = await User.findById(userId);
      if (!user) throw new Error("User not found");
  
      user.total_income = (user.total_income || 0) - transaction.amount;
      await user.save();
    } else {
      throw new Error("Invalid transaction type. Must be 'income' or 'expense'.");
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
