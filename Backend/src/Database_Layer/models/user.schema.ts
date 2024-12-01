import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

//ensures that user documents have correct prop and types at compile time 
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone:string;
  total_income: number;

  comparePassword(password: string): Promise<boolean>;
}
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  password: {
    type: String,
    required: true,
  },
  total_income:{
  type: Number,
  required: true,
  },
});
userSchema.pre('save',async function (next){
  if(this.isModified('password'))
  {
    this.password = await bcrypt.hash(this.password, 10);
  }
  //so mongoose can save document 
  next();
})



userSchema.methods.comparePassword = async function (password:string) {
  return await bcrypt.compare(password, this.password);
};
//Iuser ensures that the data matches the schema ,it gives errors if doesnt match 
//we are concernd with type safte as it login part 
const User = mongoose.model<IUser>('User', userSchema);
export default User;
