// Visualisation Service Class
import TransactionService from "./transaction.service";
import Transaction from '../../Database_Layer/models/transaction.schema';
import moment from "moment";
import Budget from "../../Database_Layer/models/budget.schema";
const transactionService = new TransactionService();
//=================================================================================================

export class VisService {
  
//=================================================================================================
    async getTotalIncome(userId: string, queryParams: any): Promise<number> {
        const transactions = await transactionService.getAllTransactions(userId, queryParams);
        return transactions
            .filter((t) => t.type === "income")
            .reduce((sum, t) => sum + t.amount, 0);
    }
//=================================================================================================
    async getTotalExpenses(userId: string, queryParams: any): Promise<number> {
        const transactions = await transactionService.getAllTransactions(userId, queryParams);
        return transactions
            .filter((t) => t.type === "expense")
            .reduce((sum, t) => sum + t.amount, 0);
    }
    
//=================================================================================================
    async getBalance(userId: string, queryParams: any): Promise<number> {
        const income = await this.getTotalIncome(userId, queryParams);
        const expenses = await this.getTotalExpenses(userId, queryParams);
        return income - expenses;
    }
//=================================================================================================
    async getMinExpense(userId: string, queryParams: any): Promise<number> {
        const transactions = await transactionService.getAllTransactions(userId, queryParams);
        const expenses = transactions.filter((t) => t.type === "expense");
        return Math.min(...expenses.map((t) => t.amount));
    }
//=================================================================================================
    async getMaxExpense(userId: string, queryParams: any): Promise<number> {
        const transactions = await transactionService.getAllTransactions(userId, queryParams);
        const expenses = transactions.filter((t) => t.type === "expense");
        return Math.max(...expenses.map((t) => t.amount));
    }
//=================================================================================================
    async getTotalSpentMoney(userId: string): Promise<number> {
      if (!userId) {
          throw new Error("User ID is required");
        }

      const totalSpent = await Budget.aggregate([
          { $match: { userId } }, 
          { $group: { _id: null, totalSpent: { $sum: "$spent" } } } 
        ]);

      if (!totalSpent.length) {
         throw new Error("No budget found");
     }

     return totalSpent[0].totalSpent; 
}
//=================================================================================================
  async getSpentLast30Days(userId: string): Promise<number> {
    if (!userId) {
        throw new Error("User ID is required");
   }

    const startDate = moment().subtract(30, 'days').toDate();
    const transactions = await Transaction.find({
        userId,
        type: "expense",
        date: { $gte: startDate } 
    });

    return transactions.reduce((sum, t) => sum + t.amount, 0); 
  } 
//=================================================================================================
  async getSpentLast12Months(userId: string): Promise<number> {
    if (!userId) {
        throw new Error("User ID is required");
   }

    const startDate = moment().subtract(12, 'months').toDate();
    const transactions = await Transaction.find({
        userId,
       type: "expense",
       date: { $gte: startDate } // Only include transactions from the last 12 months
    });

    return transactions.reduce((sum, t) => sum + t.amount, 0); // Calculate the total amount  
  }
//=================================================================================================
}
