 // routes/vis.
import { Router } from "express";
import VisController from "../controllers/vis.controller"; 
import authenticateToken from "../Middleware/AuthMiddleware";

const router = Router();

// Protect the routes with the authenticateToken middleware
router.get("/TotalIncome", authenticateToken, VisController.getTotalIncome);
//=================================================================================================
router.get("/TotalExpenses", authenticateToken, VisController.getTotalExpenses);
//=================================================================================================
router.get("/Balance", authenticateToken, VisController.getBalance);
//=================================================================================================
router.get("/MinExpense", authenticateToken, VisController.getMinExpense);
//=================================================================================================
router.get("/MaxExpense", authenticateToken, VisController.getMaxExpense);
//=================================================================================================
router.get("/AllSpent", authenticateToken, VisController.getTotalSpentMoney);
//=================================================================================================
router.get("/SpentInLast30Days", authenticateToken, VisController.getSpentLast30Days);
//=================================================================================================
router.get("/SpentInLast12months", authenticateToken, VisController.getSpentLast12Months);
//=================================================================================================

export default router;
