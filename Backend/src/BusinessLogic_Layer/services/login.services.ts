import User, { IUser } from '../../Database_Layer/models/user.schema';
import jwt from 'jsonwebtoken';

class loginServies {

static async loginUser(email:string ,password:string )
{
 const user = await User.findOne({email});
 if(!user||!(await user.comparePassword(password)))
     throw new Error ('Invalid email or passwrod');
  
 const token =jwt.sign({id:user._id},process.env.JWT_SECRET as string,{expiresIn:'1h'})
  return {token , user}
 }

}
export default loginServies ;