import { Category } from '../types/category';
import axiosInstance from '../utils/axiosInstance';


export const CategoryService = {

  async getCategories(): Promise<Category[]> {
    const response = await axiosInstance.get(`/category`);
    return response.data;
  },

  async getOneCategory(categoryId:string): Promise<Category> {
    const response = await axiosInstance.get(`/category/${categoryId}`);
    return response.data;
  },

};
