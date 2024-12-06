import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/dotenvConfig';
import { JwtPayload } from '../types/jwtPayload';
import BlacklistedTokens from '../services/blacklistStore.services';

// Extend the Request object to include user info
const authenticateToken = (req: Request & { user?: JwtPayload }, res: Response, next: NextFunction) => {
    // Get the token from the Authorization header or cookies
    const token = req.cookies['authToken']; // Token is expected in cookies
    if (!token) {
        res.status(401).json({ error: 'Authentication token missing' }); // Return error if token is missing
        return;
    }

    try {
        // Remove the 'Bearer ' prefix if it exists
        const pureToken = token.replace(/^Bearer\s/, ""); // Extract the actual token

        // Check if the token is blacklisted
        const blacklist = BlacklistedTokens.getInstance();
        if (blacklist.isTokenBlacklisted(pureToken as string)) {
            res.status(401).json({ error: 'Token has been revoked' }); // Return error if token is blacklisted
            return;
        }

        // Verify the token using the JWT secret key and attach the decoded payload (user info) to the request object
        const decoded = jwt.verify(pureToken, JWT_SECRET as string) as JwtPayload;
        req.user = decoded; // Attach user info to the request object

        next(); // Continue to the next middleware or route handler
    } catch (err) {
        // Log the error for debugging purposes
        console.error(err);

        // Send a response 401 if the token is invalid or expired
        res.status(401).json({ error: 'Invalid or expired token' });
        return;
    }
};

export default authenticateToken;
