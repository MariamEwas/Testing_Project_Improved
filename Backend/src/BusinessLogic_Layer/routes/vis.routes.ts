 // routes/vis.
import { Router } from "express";
import VisController from "../controllers/vis.controller"; 
import authenticateToken from "../Middleware/AuthMiddleware";

const router = Router();

// Protect the routes with the authenticateToken middleware
router.get("/Total Income", authenticateToken, VisController.getTotalIncome);
//=================================================================================================
router.get("/Total Expenses", authenticateToken, VisController.getTotalExpenses);
//=================================================================================================
router.get("/Balance", authenticateToken, VisController.getBalance);
//=================================================================================================
router.get("/MinExpense", authenticateToken, VisController.getMinExpense);
//=================================================================================================
router.get("/MaxExpense", authenticateToken, VisController.getMaxExpense);
//=================================================================================================
router.get("/All Spent", authenticateToken, VisController.getTotalSpentMoney);
//=================================================================================================
router.get("/Spent In Last 30 Days", authenticateToken, VisController.getSpentLast30Days);
//=================================================================================================
router.get("/Spent In Last 12 months", authenticateToken, VisController.getSpentLast12Months);
//=================================================================================================

export default router;
