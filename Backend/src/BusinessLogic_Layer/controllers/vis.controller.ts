// Visualisation.controller
import { Request, Response } from "express";
import { VisService } from "../services/vis.service";
import { JwtPayload } from "jsonwebtoken";
import authenticateToken from "../Middleware/AuthMiddleware";

//=================================================================================================

class VisController {
    private VisService: VisService;

    constructor() {
        this.VisService = new VisService();
    }
//=================================================================================================
    async getTotalIncome(req: Request & { user?: JwtPayload }, res: Response) {
        try {
            const userId = req.user?.id;  
            if (!userId) {
                 res.status(401).json({ error: 'Sorry Unauthorized :(' });
                 return;
            
                }

            const income = await this.VisService.getTotalIncome(userId, req.query);
            res.status(200).json({ income });
        } catch (error:any) {
            res.status(500).json({ error: error.message });
        }
    }
//=================================================================================================
    async getTotalExpenses(req: Request & { user?: JwtPayload }, res: Response) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                 res.status(401).json({ error: 'Sorry Unauthorized :(' });
                 return;
            }
            const expenses = await this.VisService.getTotalExpenses(userId, req.query);
            res.status(200).json({ expenses });
        } catch (error:any) {
            res.status(500).json({ error: error.message });
        }
    }
//=================================================================================================
    async getBalance(req: Request & { user?: JwtPayload }, res: Response) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                 res.status(401).json({ error: 'Sorry Unauthorized :(' });
                 return;
            }
            const balance = await this.VisService.getBalance(userId, req.query);
            res.status(200).json({ balance });
        } catch (error:any) {
            res.status(500).json({ error: error.message });
        }
    }
//=================================================================================================
    async getMinExpense(req: Request & { user?: JwtPayload }, res: Response) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                 res.status(401).json({ error: 'Sorry Unauthorized :(' });
                 return;
            }
            const minExpense = await this.VisService.getMinExpense(userId, req.query);
            res.status(200).json({ minExpense });
        } catch (error:any) {
            res.status(500).json({ error: error.message });
        }
    }
//=================================================================================================
    async getMaxExpense(req: Request & { user?: JwtPayload }, res: Response) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                 res.status(401).json({ error: 'Sorry Unauthorized :(' });
                 return;
            }
            const maxExpense = await this.VisService.getMaxExpense(userId, req.query);
            res.status(200).json({ maxExpense });
        } catch (error:any) {
            res.status(500).json({ error: error.message });
        }
    }
//=================================================================================================
    async getTotalSpentMoney(req: Request & { user?: JwtPayload }, res: Response) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({ error: "Sorry Unauthorized :(" });
                return;
            }

            const totalSpentMoney = await this.VisService.getTotalSpentMoney(userId);
            res.status(200).json({ totalSpentMoney });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

//=================================================================================================
    async getSpentLast30Days(req: Request & { user?: JwtPayload }, res: Response) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({ error: "Sorry Unauthorized :(" });
                return;
            }

            const totalSpent30Days = await this.VisService.getSpentLast30Days(userId); // Call service method
            res.status(200).json({ totalSpent30Days });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
//=================================================================================================
    async getSpentLast12Months(req: Request & { user?: JwtPayload }, res: Response) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({ error: "Sorry Unauthorized :(" });
                return;
         }

            const totalSpent12Months = await this.VisService.getSpentLast12Months(userId); // Call service method
            res.status(200).json({ totalSpent12Months });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
//=================================================================================================

}
export default new VisController (); 
