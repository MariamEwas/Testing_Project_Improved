import { Request, Response } from 'express';
import BlacklistedTokens from './blacklistStore.services';  // Import the blacklist function

class LogoutService {
    // Function to handle user logout
    async logoutUser(req: Request, res: Response) {
        // Get the token from cookies
        const token = req.cookies['authToken'];

        // If no token is found, return an error
        if (!token) {
            return res.status(401).json({ error: 'Authentication token missing' });
        }

        // Add the token to the blacklist (invalidate it)
        const blacklist = BlacklistedTokens.getInstance();
        blacklist.blacklistToken(token);

        // Clear the authentication cookie
        res.clearCookie(process.env.COOKIE_NAME as string, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Secure flag for HTTPS in production
            sameSite: 'strict', // Prevent CSRF attacks
        });

        // Send a success message after logging out
        return { message: 'Logged out successfully!' };
    }
}

export default LogoutService;
