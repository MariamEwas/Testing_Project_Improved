import { Request, Response } from 'express';
import ProfileService from '../services/profile.services';
import { JwtPayload } from 'jsonwebtoken';

class ProfileController {

// In your profile controller
constructor(private profileService: ProfileService) {}

  // Get profile of the authenticated user
  async getProfile(req: Request & { user?: JwtPayload }, res: Response) {
    const id = req.user?.id; // Extract user ID from JWT payload
    if (!id) {
      res.status(400).json({ error: 'User not authenticated' });
      return;
    }
    console.log(this.profileService+" controller"); // This should not be undefined
    try {
      const profile = await this.profileService.getUserProfile(id); // Fetch user profile
      if (!profile) {
        res.status(404).json({ error: 'Profile not found' });
        return;
      }
      res.status(200).json({ profile }); // Return profile data
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      res.status(500).json({ error: 'Something went wrong' }); // Handle server error
    }
  }

  // Update profile information for authenticated user
  async updateProfile(req: Request & { user?: JwtPayload }, res: Response) {
    const id = req.user?.id; // Extract user ID from JWT payload
    const { name, email, phone } = req.body; // Extract updated profile data

    if (!id) {
      res.status(400).json({ error: 'User is not authenticated.' }); // Handle missing user ID
      return;
    }

    try {
      const updatedProfile = await this.profileService.updateProfile(id, name, email, phone); // Update profile
      if (!updatedProfile) {
        res.status(404).json({ error: 'Error while updating profile' }); // Handle update failure
        return;
      }

      res.status(200).json({ message: 'Profile updated successfully!', updatedProfile }); // Return updated profile
    } catch (error: any) {
      console.error(error); // Log the error for debugging purposes
      res.status(500).json({ error: error.message }); // Handle server error
    }
  }

  // Change password for authenticated user
  async changePassword(req: Request & { user?: JwtPayload }, res: Response) {
    const { email, password } = req.body; // Extract email and password

    // Validate user authentication
    if (!req.user?.id) {
      res.status(401).json({ error: 'Unauthorized. Please log in.' }); // Handle missing user
      return;
    }

    // Validate presence of email and password
    if (!email || !password) {
      res.status(400).json({ error: 'Email or new password is not provided.' }); // Handle missing data
      return;
    }

    try {
      const updatedUser = await this.profileService.changePass(email, password); // Change user password
      if (!updatedUser) {
        res.status(404).json({ error: 'User not found.' }); // Handle user not found
        return;
      }

      res.status(200).json({ message: 'Password changed successfully!' }); // Return success message
    } catch (error: any) {
      console.error(error); // Log the error for debugging purposes
      res.status(500).json({ error: error.message }); // Handle server error
    }
  }
}

export default ProfileController;
