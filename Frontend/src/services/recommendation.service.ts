import axios from 'axios';
import { Recommendation } from '../types/recommendation';
import axiosInstance from '../utils/axiosInstance';
// import { API_BASE_URL } from '../config/api';


export const recommendationService = {

//   async getAllTransactions(filters?: TransactionFilters): Promise<Transaction[]> {
//     const params = new URLSearchParams();
//     if (filters?.date) params.append('date', filters.date);
//     if (filters?.category) params.append('category', filters.category);

//     const response = await api.get<Transaction[]>('/transactions', { params });
//     return response.data;
//   },

  async getRecommendations(): Promise<Recommendation[]> {
    const response = await axiosInstance.get(`/recommendation`);
    console.log(response.data.user_recommendations);
    return response.data.user_recommendations;
  },


  async generateRecommendation():Promise<String>{
    const response = await axiosInstance.post('/recommendation/call-python');
    console.log(response.data);
    return response.data.recommends;
  }

};
