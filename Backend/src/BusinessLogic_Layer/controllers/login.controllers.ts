import { Request, Response } from 'express';
import LoginService from '../services/login.services';
import jwt from 'jsonwebtoken';
import { JWT_SECRET,  JWT_EXPIRATION} from '../config/dotenvConfig';

// Controller for handling user login
class LoginController {
  constructor(private loginService: LoginService) {}

  // Login function to authenticate user and generate JWT token
  async login(req: Request, res: Response) {
    // Extract email and password from request body
    const { email, password } = req.body;
    
    try {
      // Call service method to authenticate the user
      const user = await this.loginService.loginUser(email, password, res);

      // If user not found or credentials are incorrect
      if (!user) {
        // Return error response if credentials are invalid
        res.status(400).json({ error: 'Invalid credentials' });
        return;
      }

      // Create JWT token with user ID and expiration time from environment variable
      const token = await jwt.sign({ id: user._id }, JWT_SECRET as string, {
        expiresIn: JWT_EXPIRATION, // Set token expiration from environment variable
      });

      // Set JWT token in a secure cookie for the client
      res.cookie(process.env.COOKIE_NAME as string, token, {
        httpOnly: true,  // Prevents client-side access to the cookie
        sameSite: 'strict', // Protects against CSRF attacks
        maxAge: 3600000, // Token expires in 1 hour
      });
  
      // Respond with success message and user data
      res.status(200).json({
        message: 'Login successful',
        user,
      });
      return;
    } catch (error: any) {
      // Log error for debugging purposes
      console.error(error);
      // Return internal server error response if something goes wrong
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
  }
}

export default LoginController;
