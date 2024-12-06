import { Request, Response } from "express";
import BudgetService from "../services/budget.service";
import { JwtPayload } from 'jsonwebtoken';


class BudgetController {



  async getAllBudgets(req: Request  & { user?: JwtPayload }, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) throw new Error("User ID not found in request.");

      const budgets = await BudgetService.getAllBudgets(userId);
      res.status(200).json(budgets);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }




  async addBudget(req: Request  & { user?: JwtPayload }, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) throw new Error("User ID not found in request.");

      const { category, limit } = req.body;

      const newBudget = await BudgetService.addBudget({ category, limit, userId });
      res.status(201).json(newBudget);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }




  async editBudget(req: Request & { user?: JwtPayload }, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) throw new Error("User ID not found in request.");


      const updateData = req.body;


      const updatedBudget = await BudgetService.editBudget(updateData, userId);
      res.status(200).json(updatedBudget);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }




  async deleteBudget(req: Request  & { user?: JwtPayload }, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) throw new Error("User ID not found in request.");

      const budgetId = req.params.id;
      console.log(budgetId);

      const deletedBudget = await BudgetService.deleteBudget(budgetId, userId);
      res.status(200).json(deletedBudget);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new BudgetController();
