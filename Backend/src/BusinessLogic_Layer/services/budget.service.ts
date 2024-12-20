import Budget from '../../Database_Layer/models/budget.schema';
import Category from '../../Database_Layer/models/category.schema';
import mongoose, { Types } from "mongoose";

class BudgetService {


  // get all budgets of a user
  async getAllBudgets(userId: string) {
    if (!Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid User ID");
    }

    //convert the ID as string to ObjectId to retrieve from the database
    let ID = new Types.ObjectId(userId);

    //get all budgets related to the user from the database 
    const budgets = await Budget.find({ userId:ID }).populate('category');

    if (!budgets.length) {
      throw new Error("No budgets found for the user.");
    }
    return budgets;
  }


// add a budget for a user
  async addBudget(budgetData: {
    category: string;
    limit: number;
    userId: string;
  }) {
    
    //Object destructring 
    const { category, limit, userId } = budgetData;

    //no mongo ObjectId found for (userId/category) 
    if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(category)) {
      throw new Error("Invalid User ID or Category ID");
    }

    //If found an budget for this category, throw an error
    const existingBudget = await Budget.findOne({ category, userId });

    if (existingBudget) {
      throw new Error("A budget for this category already exists.");
    }

    //create the budget for this category
    const newBudget = new Budget({
      category,
      limit,
      spent: 0,
      userId,
    });

    return await newBudget.save();
  }


  // edit a budget for user
  async editBudget(
    updateData: { budgetId:string ,limit?: number; spent?: number;},
    userId: string
  ) {

        //no mongo ObjectId found for (userId/category) 
    if (!Types.ObjectId.isValid(updateData.budgetId) ||  !Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid Budget ID or User ID");
    }

    //update the budget by the data come to the method
    let ID = new mongoose.Types.ObjectId(userId)
    const budget = await Budget.findOne({ _id: updateData.budgetId, userId:ID });
    if (!budget) {
      throw new Error("Budget not found.");
    }

    //update the limit and spent of the budget
    if (updateData.limit !== undefined) budget.limit = updateData.limit;
    if (updateData.spent !== undefined) budget.total_spent = updateData.spent;

    return await budget.save();
  }


  // delete budget for user
  async deleteBudget(budgetId: string, userId: string) {
    if (!Types.ObjectId.isValid(budgetId) || !Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid Budget ID or User ID");
    }

    //find the budget and delte it from the database
    const budget = await Budget.findByIdAndDelete(budgetId);
    if (!budget) {
      throw new Error("Budget not found or already deleted.");
    }

    return budget;
  }
}


export default  BudgetService;
