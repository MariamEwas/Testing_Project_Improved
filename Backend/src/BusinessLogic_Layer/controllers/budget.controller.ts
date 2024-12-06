import { Request, Response } from "express";
import BudgetService from "../services/budget.service";
import { JwtPayload } from 'jsonwebtoken';


class BudgetController {

  //inject the service into the controller
  constructor(private budgetService:BudgetService){}


  async getAllBudgets(req: Request  & { user?: JwtPayload }, res: Response) {
    try {
      
      //not found the user
      const userId = req.user?.id;
      if (!userId) throw new Error("User ID not found in request.");

      //call the method from the service to get all budgets
      const budgets = await this.budgetService.getAllBudgets(userId);
      res.status(200).json(budgets);
    } 
    
    catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }




  async addBudget(req: Request  & { user?: JwtPayload }, res: Response) {
    try {

      //not found user
      const userId = req.user?.id;
      if (!userId) throw new Error("User ID not found in request.");

      //destructure of the body
      const { category, limit } = req.body;

      const newBudget = await this.budgetService.addBudget({ category, limit, userId });
      res.status(201).json(newBudget);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }




  async editBudget(req: Request & { user?: JwtPayload }, res: Response) {
    try {

      //not found user
      const userId = req.user?.id;
      if (!userId) throw new Error("User ID not found in request.");


      const updateData = req.body;

      //get the data from the service
      const updatedBudget = await this.budgetService.editBudget(updateData, userId);
      res.status(200).json(updatedBudget);

    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }



  //method to delete the budget
  async deleteBudget(req: Request  & { user?: JwtPayload }, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) throw new Error("User ID not found in request.");

      //get the budget from params
      const budgetId = req.params.id;

      //delete the budget and return it  
      const deletedBudget = await this.budgetService.deleteBudget(budgetId, userId);
      res.status(200).json(deletedBudget);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default BudgetController;
