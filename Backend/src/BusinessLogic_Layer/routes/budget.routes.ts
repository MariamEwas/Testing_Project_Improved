import express from "express";
import BudgetController from "../controllers/budget.controller";
import authenticateToken from '../Middleware/AuthMiddleware';
import BudgetService from "../services/budget.service";

const router = express.Router();

const budgetService = new BudgetService();
const budgetController = new BudgetController(budgetService);
// Get all budgets for a user
router.get("/", authenticateToken, (req,res)=>budgetController.getAllBudgets(req,res));

// Add a new budget
router.post("/", authenticateToken, (req,res)=>budgetController.addBudget(req,res));

// Edit an existing budget (including category updates)
router.put("/:id", authenticateToken, (req,res)=>budgetController.editBudget(req,res));

// Delete a budget
router.delete("/:id", authenticateToken, (req,res)=>budgetController.deleteBudget(req,res));

export default router;
