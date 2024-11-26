import { Router } from 'express';
import AuthController from '../../BusinessLogic_Layer/controllers/profile.controllers';
import authenticateToken from '../../BusinessLogic_Layer/Middleware/AuthMiddleware';

const router = Router();


router.get('/getProfile', authenticateToken, AuthController.getProfile);

router.put('/updateProfile', authenticateToken, AuthController.updateProfile);

router.put('/change-password', authenticateToken, AuthController.changePassword);

export default router;
