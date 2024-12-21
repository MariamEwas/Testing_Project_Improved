import axios from 'axios';

// Create an axios instance for making API requests
const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true, // Important for sending cookies with requests
});

// Profile service for handling profile-related requests
export const profileService = {
  // Get the authenticated user's profile
  async getProfile() {
    try {
      const response = await api.get('/api/auth/profile/get-profile');
      return response.data; // Return the profile data
    } catch (error: any) {
      throw error.response?.data?.error || 'Something went wrong while fetching the profile';
    }
  },

  // Update the authenticated user's profile
  async updateProfile(data: { name: string; email: string; phone: string }) {
    try {
      const response = await api.put('/api/auth/profile/update-profile', data);
      return response.data; // Return updated profile data
    } catch (error: any) {
      throw error.response?.data?.error || 'Something went wrong while updating the profile';
    }
  },

  // Change the password of the authenticated user
  async changePassword(data: { email: string; password: string }) {
    try {
      const response = await api.put('/api/auth/profile/change-password', data);
      return response.data; // Return success message
    } catch (error: any) {
      throw error.response?.data?.error || 'Something went wrong while changing the password';
    }
  },
};
