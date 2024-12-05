import { Router } from "express";
import TransactionController from "../controllers/transaction.controller";
import authenticateToken from '../Middleware/AuthMiddleware';

const router = Router();

// Route to get all transactions for the authenticated user
router.get("/", authenticateToken, TransactionController.getAllTransactions);

// Route to get a single transaction by ID for the authenticated user
router.get("/:id", authenticateToken, TransactionController.getTransactionById);

// Route to add a new transaction for the authenticated user
router.post("/", authenticateToken, TransactionController.addTransaction);

// Route to delete a transaction by ID for the authenticated user
router.delete("/:id", authenticateToken, TransactionController.deleteTransaction);

// router.put("/transactions/:id", authenticate, TransactionController.updateTransaction);

export default router;
