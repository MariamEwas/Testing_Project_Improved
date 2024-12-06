import express from 'express';
import LogoutController from '../controllers/logout.controllers';
import authenticateToken from '../Middleware/AuthMiddleware';
import { Request, Response } from 'express';
import LogoutService from '../services/logout.services';

const router = express.Router();

// Initialize the LogoutService to handle logout logic
const logoutService = new LogoutService();

// Initialize the LogoutController and inject the LogoutService
const logoutController = new LogoutController(logoutService);

// POST route for logging out a user
// First, the request passes through the authenticateToken middleware to ensure the user is authenticated
router.post('/', authenticateToken, (req: Request, res: Response) => logoutController.logout(req, res));

// Export the router to be used in the main application
export default router;
