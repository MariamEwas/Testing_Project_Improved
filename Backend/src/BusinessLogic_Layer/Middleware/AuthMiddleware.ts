import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import * as dotenv from 'dotenv';
import { error } from 'console';
dotenv.config();

//structure of payload of jwt 
interface JwtPayload {
    id: string;
  }


  const authenticateToken = (req: Request & { user?: JwtPayload }, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];
    //console.log("y3m b2a "+req.headers['authorization']);
  
    if (!token) {
       res.status(401).json({ error: 'Authentication token missing' });
       return ;
    }
  
    try {
      const pureToken = token.replace(/^Bearer\s/, ""); // Extract the actual token

      // Verify token and attach the decoded payload (user info) to the request object
      console.log(pureToken  +"ana hna ");
      console.log("hey "+process.env.JWT_SECRET );
      const decoded = jwt.verify(pureToken, process.env.JWT_SECRET as string) as JwtPayload;
      req.user = decoded; // Attach user info to the request object
     
      next(); // Continue to the next middleware or route handler
    } catch (err) {
      // Send a response if the token is invalid or expired
      console.log(err);
       res.status(401).json({ error: 'Invalid or expired token' });
       return ;
    }
  };
  
  export default authenticateToken;


  