import User, { IUser } from '../../Database_Layer/models/user.schema';

class loginServies {
  // Function to handle user login
  async loginUser(email: string, password: string, res: any) {
    // Find user by email
    const user = await User.findOne({ email });

    // If user not found or password doesn't match, throw an error
    if (!user || !(await user.comparePassword(password))) {
      throw new Error('Invalid email or password');
    }

    // Remove the password from the user object before returning
    const { password: _password, ...userWithoutPassword } = user.toObject();
    
    // Return the user without the password field
    return userWithoutPassword;
  }
}

export default loginServies;
