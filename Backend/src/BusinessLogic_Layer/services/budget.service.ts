import Budget from '../../Database_Layer/models/budget.schema';
import Category from '../../Database_Layer/models/category.schema';
import { Types } from "mongoose";

class BudgetService {


  // get all budgets of a user
  async getAllBudgets(userId: string) {
    if (!Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid User ID");
    }
    console.log(userId);
    let ID = new Types.ObjectId(userId);
    console.log(ID);
    const budgets = await Budget.find({ userId:ID });
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
    const { category, limit, userId } = budgetData;

    if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(category)) {
      throw new Error("Invalid User ID or Category ID");
    }

    const existingBudget = await Budget.findOne({ category, userId });
    if (existingBudget) {
      throw new Error("A budget for this category already exists.");
    }

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
    updateData: { budgetId:string ,limit?: number; spent?: number; category?: string },
    userId: string
  ) {
    if (!Types.ObjectId.isValid(updateData.budgetId) || !Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid Budget ID or User ID");
    }

    const budget = await Budget.findOne({ _id: updateData.budgetId, userId });
    if (!budget) {
      throw new Error("Budget not found.");
    }

    // Handle category update by name
    if (updateData.category) {
      const newCategory = await Category.findById(updateData.category);
      if (!newCategory) {
        throw new Error("Category not found.");
      }

      // Check if another budget exists with this category
      const duplicateBudget = await Budget.findOne({
        category: newCategory._id,
        userId,
      });
      if (duplicateBudget && duplicateBudget._id.toString() !== updateData.budgetId) {
        throw new Error("A budget for this category already exists.");
      }

      budget.category = newCategory._id; // Update the category reference
    }

    if (updateData.limit !== undefined) budget.limit = updateData.limit;
    if (updateData.spent !== undefined) budget.total_spent = updateData.spent;

    return await budget.save();
  }


  // delete budget for user
  async deleteBudget(budgetId: string, userId: string) {
    if (!Types.ObjectId.isValid(budgetId) || !Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid Budget ID or User ID");
    }

    const budget = await Budget.findOneAndDelete({ _id: budgetId, userId });
    if (!budget) {
      throw new Error("Budget not found or already deleted.");
    }

    return budget;
  }
}


export default new BudgetService();
