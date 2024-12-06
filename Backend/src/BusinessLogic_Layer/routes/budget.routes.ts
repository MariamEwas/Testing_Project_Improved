import express from "express";
import BudgetController from "../controllers/budget.controller";
import authenticateToken from '../Middleware/AuthMiddleware';
import BudgetService from "../services/budget.service";

const router = express.Router();

const budgetService = new BudgetService();
const budgetController = new BudgetController(budgetService);
// Get all budgets for a user
router.get("/my-budgets", authenticateToken, (req,res)=>budgetController.getAllBudgets(req,res));

// Add a new budget
router.post("/add-budget", authenticateToken, (req,res)=>budgetController.addBudget(req,res));

// Edit an existing budget (including category updates)
router.put("/my-budgets", authenticateToken, (req,res)=>budgetController.editBudget(req,res));

// Delete a budget
router.delete("/my-budgets/:id", authenticateToken, (req,res)=>budgetController.deleteBudget(req,res));

export default router;
