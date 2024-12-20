import { Request, Response } from "express";
import categoryService from "../services/category.service";
import { JwtPayload } from 'jsonwebtoken';


class CategoryController {

  //inject the service into the controller
  constructor(private categoryService:categoryService){}


  async getCategories(req: Request  & { user?: JwtPayload }, res: Response) {
    try {
      
      //not found the user
      const userId = req.user?.id;
      if (!userId) throw new Error("User ID not found in request.");

      //call the method from the service to get all budgets
      const categories = await this.categoryService.getAllCategories();
      res.status(200).json(categories);
    } 
    
    catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getOneCategory(req: Request  & { user?: JwtPayload }, res: Response) {
    try {
      
      //not found the user
      const userId = req.user?.id;
      if (!userId) throw new Error("User ID not found in request.");
      const categoryId = req.params.id;

      const category = await this.categoryService.getOneCategory(categoryId);
      res.status(200).json(category);
    } 
    
    catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }


}

export default CategoryController;
