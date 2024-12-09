import { Router } from 'express';
import RecommendationController from '../controllers/recommendation.controller';
import authenticateToken from '../Middleware/AuthMiddleware';
import PythonService from '../services/python.service';
import RecommendationService from '../services/recommendation.service';
import TransactionService from '../services/transaction.service';
import BudgetService from '../services/budget.service';

const router = Router();

//create an instance of each service that the controller uses
const recommendationService = new RecommendationService();
const pythonService = new PythonService();
const transactionService = new TransactionService();
const budgetService = new BudgetService();
const recommendationController = new RecommendationController(recommendationService, pythonService, transactionService,budgetService); //dependency injection


router.get('/', authenticateToken, (req, res) => recommendationController.getRecommendations(req, res));
router.post('/', authenticateToken, (req, res) => recommendationController.createRecommendation(req, res));
router.post('/call-python', authenticateToken, (req, res) => recommendationController.generateRecommendation(req, res));

export default router;
