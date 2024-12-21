import axios from 'axios';
import { login } from '../types/login';

//i feel like making it global just to avoid redundancy 
const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true, // This is important for sending cookies with requests
  });
  
  export const loginService = {
    async Login(data: { email: string; password: string }) {
      // Send email and password in the body
      const response = await api.post('api/auth/login/', data,{ withCredentials: true });
      return response.data;
    }
  };
  