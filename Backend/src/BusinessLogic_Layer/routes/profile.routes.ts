import { Router } from 'express';
import ProfileController from '../controllers/profile.controllers';
import ProfileService from '../services/profile.services';
import authenticateToken from '../Middleware/AuthMiddleware';

// Initialize the router for handling profile-related routes
const router = Router();

// Create instances of ProfileService and ProfileController
const profileService = new ProfileService();
const profileController = new ProfileController(profileService);

// Route to get the user's profile
// Uses authenticateToken middleware to verify the user's authentication before fetching the profile
router.get('/get-profile', authenticateToken, (req, res) => profileController.getProfile(req, res));

// Route to update the user's profile
// Uses authenticateToken middleware to ensure the user is authenticated before updating the profile
router.put('/update-profile', authenticateToken, (req, res) => profileController.updateProfile(req, res));

// Route to change the user's password
// Uses authenticateToken middleware to verify the user's authentication before changing the password
router.put('/change-password', authenticateToken, (req, res) => profileController.changePassword(req, res));

// Export the router to be used in the main application
export default router;
