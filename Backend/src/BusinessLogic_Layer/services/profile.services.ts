import User, { IUser } from '../../Database_Layer/models/user.schema';
import bcrypt from 'bcryptjs';
class profile{
    constructor(){};
    static async getUserProfile(id:string)
    {
        return await User.findById(id).select('-password'); ;

    }

    static async updateProfile(id:string,name:string ,email:string , phone:string )
    {
        const updatedUser = await User.findByIdAndUpdate(
            id,{name,email,phone},{new:true}
        );
        return updatedUser;

    }

    static async getUserEmail(userId: string) {
        return await User.findById(userId).select('name email');
      }

    static async changePass(email:string,password:string)
    {
        const hashedPassword = await bcrypt.hash(password, 10);
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
export default profile ;