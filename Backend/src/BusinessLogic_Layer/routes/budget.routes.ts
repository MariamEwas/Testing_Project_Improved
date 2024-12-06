import express from "express";
import BudgetController from "../controllers/budget.controller";
import authenticateToken from '../Middleware/AuthMiddleware';

const router = express.Router();

// Get all budgets for a user
router.get("/my-budgets", authenticateToken, BudgetController.getAllBudgets);

// Add a new budget
router.post("/add-budget", authenticateToken, BudgetController.addBudget);

// Edit an existing budget (including category updates)
router.put("/my-budgets", authenticateToken, BudgetController.editBudget);

// Delete a budget
router.delete("/my-budgets/:id", authenticateToken, BudgetController.deleteBudget);

export default router;
