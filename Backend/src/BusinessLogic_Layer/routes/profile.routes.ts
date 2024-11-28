import { Router } from 'express';
import profileController from '../controllers/profile.controllers';
import authenticateToken from '../Middleware/AuthMiddleware';

const router = Router();


router.get('/get-profile', authenticateToken, profileController.getProfile);

router.put('/update-profile', authenticateToken, profileController.updateProfile);

router.put('/change-password', authenticateToken, profileController.changePassword);

router.get('/get-email', authenticateToken,profileController.getEmail);

export default router;
