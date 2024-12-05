// Why class-based version of controllers???->

// The controller focuses only on request/response handling, while the service layer
// handles the business logic (database interactions, calculations, etc.). 
// This separation of concerns helps maintain clarity and simplifies unit testing.

// transaction.controller.ts
import { Request, Response } from "express";
import TransactionService from "../services/transaction.service";
import { JwtPayload } from 'jsonwebtoken';

const transactionService = new TransactionService();

class TransactionController {
 

  async getAllTransactions(req: Request  & { user?: JwtPayload }, res: Response) {
    try {
        const user = req.user;
        if (!user || !user.id) {
        res.status(401).json({ error: 'User not authenticated or invalid token' });
         return ;
        }
      const queryParams = req.query;      
      const transactions = await transactionService.getAllTransactions(user.id,queryParams);
      res.status(200).json(transactions);
    } catch (err: unknown) {
        res.status(500).json({ error: (err as Error).message });
      }
  }




  async getTransactionById(req: Request & { user?: JwtPayload }, res: Response) {
    try {
        const user = req.user;
        if (!user || !user.id) {
          res.status(401).json({ error: "User not authenticated or invalid token" });
          return;
        }
        
      const transaction = await transactionService.getTransactionById(req.params.id, user.id);
      res.status(200).json(transaction);
    } catch (err: unknown) {
        res.status(500).json({ error: (err as Error).message });
      }
  }




  async addTransaction(req: Request & { user?: JwtPayload }, res: Response) {
    try {

        const user = req.user;
        if (!user || !user.id) {
          res.status(401).json({ error: "User not authenticated or invalid token" });
          return;
        }

      const transaction = await transactionService.addTransaction({ ...req.body, userId: user.id });
      res.status(201).json(transaction);
    } catch (err: unknown) {
        res.status(500).json({ error: (err as Error).message });
      }
  }




  async deleteTransaction(req: Request & { user?: JwtPayload }, res: Response) {
    try {

        const user = req.user;
        if (!user || !user.id) {
          res.status(401).json({ error: "User not authenticated or invalid token" });
          return;
        }
      const transaction = await transactionService.deleteTransaction(req.params.id, user.id);
      res.status(200).json({ message: "Transaction deleted successfully", transaction });
    } catch (err: unknown) {
        res.status(500).json({ error: (err as Error).message });
      }
  }

}

export default new TransactionController();
