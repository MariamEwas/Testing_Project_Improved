import { Request, Response } from 'express';
import profileService from '../services/profile.services';

import { JwtPayload } from 'jsonwebtoken';

class profileController {
    static async getProfile(req: Request  & { user?: JwtPayload }, res: Response) {
        const id = req.user?.id; 
        if (!id) {
          res.status(400).json({ error: 'User not authenticated' });
          return ;
        }
      
        try {
          const profile = await profileService.getUserProfile(id);
          if (!profile) {
           res.status(404).json({ error: 'Profile not found' });
           return ;
          }
          res.status(200).json({ profile });
          return ;
        } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
        return ;
        }
      }
      static async getEmail(req: Request & { user?: JwtPayload }, res: Response): Promise<void> {
        try {
          const user = req.user;
          if (!user || !user.id) {
          res.status(401).json({ error: 'User not authenticated or invalid token' });
           return ;
          }
          const profile = await profileService.getUserEmail(user.id); // Use the `id` from the token
          res.status(200).json({ profile });
        } catch (error: any) {
          res.status(400).json({ error: error.message });
        }
      }
      
 static async updateProfile(req:Request & { user?: JwtPayload },res:Response)
 {
    const id = req.user?.id;
    const { name, email, phone } = req.body;
    if (!id) {
        res.status(400).json({ error: 'User is not authenticated.' });
        return ;
    }

  try {
        const updatedProfile = await profileService.updateProfile(id,name,email,phone);
        if (!updatedProfile) {
            res.status(404).json({ error: 'error while updating profile' });
            return ;
        }

        res.status(200).json({ message: 'Profile updated successfully!', updatedProfile });
        return ;
    }
    catch(error:any ){
       res.status(500).json({ error: error.message });
       return ;
    }
 }
 static async changePassword(req: Request & { user?: JwtPayload }, res: Response) {
    const { email, password } = req.body;

    if (!req.user?.id) {
       res.status(401).json({ error: 'Unauthorized. Please log in.' });
       return;
    }

    if (!email || !password) {
        res.status(400).json({ error: 'Email or new password is not required.' });
        return;
    }

    try {
        const updatedUser = await profileService.changePass(email, password);

        if (!updatedUser) {
             res.status(404).json({ error: 'User not found.' });
             return;
        }

        res.status(200).json({ message: 'Password changed successfully!' });
        return ;
    } catch (error: any) {
        res.status(500).json({ error: error.message });
        return ;
    }
}

}
export default profileController;
