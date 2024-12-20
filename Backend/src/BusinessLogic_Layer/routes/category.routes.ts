import express from "express";
import authenticateToken from '../Middleware/AuthMiddleware';
import CategoryService from "../services/category.service";
import CategoryController from "../controllers/category.controller";

const router = express.Router();

const categoryService = new CategoryService();
const categoryController = new CategoryController(categoryService);
// Get all budgets for a user
router.get("/", authenticateToken, (req,res)=>categoryController.getCategories(req,res));

// Add a new budget
router.get("/:id", authenticateToken, (req,res)=>categoryController.getOneCategory(req,res));


export default router;
