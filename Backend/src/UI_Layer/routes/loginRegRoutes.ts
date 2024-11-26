import express from 'express';
import AuthController from '../../BusinessLogic_Layer/controllers/loginReg.controllers';
import authenticateToken from '../../BusinessLogic_Layer/Middleware/AuthMiddleware';

const router = express.Router();
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/me', authenticateToken,AuthController.getProfile);

export default router;