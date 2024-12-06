import User, { IUser } from '../../Database_Layer/models/user.schema';
import bcrypt from 'bcryptjs';

class ProfileService {
    // Get the user's profile, excluding the password
    async getUserProfile(id: string) {
        return await User.findById(id).select('-password');
    }

    // Update user's profile with new name, email, and phone
    async updateProfile(id: string, name: string, email: string, phone: string) {
        const updatedUser = await User.findByIdAndUpdate(
            id, { name, email, phone }, { new: true }
        );
        return updatedUser;
    }

    // Get the user's name and email by user ID
    async getUserEmail(userId: string) {
        return await User.findById(userId).select('name email');
    }

    // Change the user's password (hashes the new password)
    async changePass(email: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);  // Hash password before saving
        const updatedUser = await User.findOneAndUpdate(
            { email },
            { password: hashedPassword },
            { new: true }
        );

        if (!updatedUser) {
            throw new Error('User not found');
        }

        return updatedUser;
    }
}

export default ProfileService;
