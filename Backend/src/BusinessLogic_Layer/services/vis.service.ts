// Visualisation Service Class
import TransactionService from "./transaction.service";
import Transaction from '../../Database_Layer/models/transaction.schema';
import moment from "moment";
export class VisService {
//=================================================================================================
    async getTotalIncome(userId: string, queryParams: any): Promise<number> {
        const transactions = await TransactionService.getAllTransactions(userId, queryParams);
        return transactions
            .filter((t) => t.type === "income")
            .reduce((sum, t) => sum + t.amount, 0);
    }
//=================================================================================================
    async getTotalExpenses(userId: string, queryParams: any): Promise<number> {
        const transactions = await TransactionService.getAllTransactions(userId, queryParams);
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
        const transactions = await TransactionService.getAllTransactions(userId, queryParams);
        const expenses = transactions.filter((t) => t.type === "expense");
        return Math.min(...expenses.map((t) => t.amount));
    }
//=================================================================================================
    async getMaxExpense(userId: string, queryParams: any): Promise<number> {
        const transactions = await TransactionService.getAllTransactions(userId, queryParams);
        const expenses = transactions.filter((t) => t.type === "expense");
        return Math.max(...expenses.map((t) => t.amount));
    }
//=================================================================================================
    // async getTotalSpentMoney(userId: string): Promise<Record<string, number>> {
    //     // Get all transactions for the user that are of type "expense"
    //     const transactions = await Transaction.find({ userId, type: "expense" }).populate("category");
    //     // Create a map to hold the sum for each category
    //     const categorySpentMap: Record<string, number> = {};
    //     // Loop through each transaction
    //     transactions.forEach((Transaction) => {
    //       const categoryName = transactions.Category.name;
    //       const amount = transactions.amount;
    
    //       // Add the amount to the respective category, initializing to 0 if the category is not in the map
    //       if (categorySpentMap[categoryName]) {
    //         categorySpentMap[categoryName] += amount;
    //       } else {
    //         categorySpentMap[categoryName] = amount;
    //       }
    //     });
    //     return categorySpentMap;
    //   }
//=================================================================================================
    async getSpentLast30Days(userId: string): Promise<number> {
    const startDate = moment().subtract(30, 'days').toDate();
    const transactions = await Transaction.find({
      // Filter transactions from the last 30 days
      userId,
      type: "expense",
      date: { $gte: startDate }  
    });
    
    return transactions.reduce((sum, t) => sum + t.amount, 0);
  }
//=================================================================================================
    async getSpentLast12Months(userId: string): Promise<number> {
    const startDate = moment().subtract(12, 'months').toDate();
    const transactions = await Transaction.find({
      // Filter transactions from the last 12 months
      userId,
      type: "expense",
      date: { $gte: startDate }  
    });

    return transactions.reduce((sum, t) => sum + t.amount, 0);
  }
//=================================================================================================
}
