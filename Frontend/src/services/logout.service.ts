import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth/logout'; // Replace with your backend API URL

const logoutService = async () => {
  try {
    // Make a POST request to the backend to log out the user
    const response = await axios.post(`${API_URL}/`, {}, { withCredentials: true });
    
    // If the logout is successful, you can handle post-logout actions
    return response.data;
  } catch (error) {
    // Handle error if any
    console.error('Logout error:', error);
    throw new Error('Failed to log out');
  }
};

export default logoutService;
