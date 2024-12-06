import { Request, Response } from 'express';
import LogoutService from '../services/logout.services';

// Controller for handling user logout
class LogoutController {
  // Inject the LogoutService into the controller
  constructor(private logoutService: LogoutService) {}

  // Logout function to handle user logout and clear session or token
  async logout(req: Request, res: Response) {
    try {
      // Call the service method to log out the user
      const result = await this.logoutService.logoutUser(req, res);  // Pass req and res to the service method
      // Respond with the result of the logout operation
      res.status(200).json(result);
    } catch (error: any) {
      // In case of an error, log the error and send an internal server error response
      console.error(error);  // Log error for debugging purposes
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default LogoutController;
