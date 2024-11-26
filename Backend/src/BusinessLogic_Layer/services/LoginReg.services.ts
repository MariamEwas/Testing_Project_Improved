import User, { IUser } from '../../Database_Layer/models/user.schema';
import jwt from 'jsonwebtoken';

class AuthServies {
    constructor(){};
   static async registerUser(name:string   ,email:string ,phone:string,password:string )
   {
        const user = await User.findOne({email});
        if (user)
        {
            throw new Error("Email already in use ")
        }
        const newUser = new User ({name,email,phone,password});
        return await newUser.save();

   }
   static async loginUser(email:string ,password:string )
   {
    const user = await User.findOne({email});
    if(!user||!(await user.comparePassword(password)))
        throw new Error ('Invalid email or passwrod');
     
    const token =jwt.sign({id:user._id},process.env.JWT_SECRET as string,{expiresIn:'1h'})
     return {token , user}
    }

    static async getUserProfile(userId: string) {
        return await User.findById(userId).select('name email');
      }

    
}
export default AuthServies;
