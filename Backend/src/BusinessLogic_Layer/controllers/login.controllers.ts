import { Request, Response } from 'express';
import loginService from '../services/login.services';

import { JwtPayload } from 'jsonwebtoken';

class loginController {

static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const { token, user } = await loginService.loginUser(email, password);
      res.status(200).json({ message: 'Login successful!', token, user });
    } catch (error:any ) {
      res.status(400).json({ error: error.message });
    }
  }
  

}
export default loginController ;
