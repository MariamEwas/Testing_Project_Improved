import { Request, Response } from 'express';
import AuthService from '../services/LoginReg.services';

import { JwtPayload } from 'jsonwebtoken';

class AuthController {

static async register (req:Request,res:Response)
{
    const {name ,email,phone ,password}=req.body;
    try {
        const user =await AuthService.registerUser(name ,email,phone,password);
        res.status(201).json({message:'User registered successfully!',user});
    }
    catch (error:any) {
        res.status(400).json({ error: error.message });
      }
}
static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const { token, user } = await AuthService.loginUser(email, password);
      res.status(200).json({ message: 'Login successful!', token, user });
    } catch (error:any ) {
      res.status(400).json({ error: error.message });
    }
  }
  

  static async getProfile(req: Request & { user?: JwtPayload }, res: Response): Promise<void> {
    try {
      const user = req.user;
      if (!user || !user.id) {
      res.status(401).json({ error: 'User not authenticated or invalid token' });
       return ;
      }
      const profile = await AuthService.getUserProfile(user.id); // Use the `id` from the token
      res.status(200).json({ profile });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
  



}
export default AuthController ;
