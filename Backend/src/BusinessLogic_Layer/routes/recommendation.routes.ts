import { Router } from 'express';
import RecommendationController from '../controllers/recommendation.controller';
import authenticateToken from '../Middleware/AuthMiddleware';

const router = Router();


router.get('/', authenticateToken, RecommendationController.getRecommendations);

router.post('/', authenticateToken, RecommendationController.createRecommendation);

router.post('/call-python',RecommendationController.generateRecommendation);

export default router;
