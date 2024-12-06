import { Router } from "express";
import express from 'express'
import TransactionController from "../controllers/transaction.controller";
import TransactionService from "../services/transaction.service";
import authenticateToken from '../Middleware/AuthMiddleware';

const router = express.Router();

const transactionService = new TransactionService();
const transactionController = new TransactionController(transactionService);

// Route to get all transactions for the authenticated user
router.get("/", authenticateToken, (req,res)=> transactionController.getAllTransactions(req,res));

// Route to get a single transaction by ID for the authenticated user
router.get("/:id", authenticateToken, (req,res)=> transactionController.getTransactionById(req,res));

// Route to add a new transaction for the authenticated user
router.post("/", authenticateToken, (req,res)=> transactionController.addTransaction(req,res));

// Route to delete a transaction by ID for the authenticated user
router.delete("/:id", authenticateToken, (req,res)=> transactionController.deleteTransaction(req,res));


export default router;
