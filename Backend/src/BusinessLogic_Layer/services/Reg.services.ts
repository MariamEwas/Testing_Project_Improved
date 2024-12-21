import User, { IUser } from '../../Database_Layer/models/user.schema';
import jwt from 'jsonwebtoken';

class regServies {
   constructor(){};
   static async registerUser(name:string  ,email:string ,phone:string,password:string )
   {
        const user = await User.findOne({email});
        if (user)
        {
            throw new Error("Email already in use ")
        }
        const newUser = new User ({name,email,phone,password});
        return await newUser.save();

   }
  
  
}
export default regServies;
