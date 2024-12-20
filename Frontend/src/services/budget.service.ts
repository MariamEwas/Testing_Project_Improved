import { Budget } from '../types/budget';
import axiosInstance from '../utils/axiosInstance';


export const budgetService = {

  async getBudgets(): Promise<Budget[] | {message:string}> {

    try{    
      
      const budgets = await axiosInstance.get(`/budgets`);
      console.log(budgets.data);
      return budgets.data;
    }
    catch(err:any){
      return {message:err.message};
    }
  },

  async updateBudget(id:string,budget:Budget): Promise<Budget | {message:string}> {

    try{    
      const budgets = await axiosInstance.put(`/budgets/${id}`,{budgetId:id,limit: budget.limit});
      console.log(budgets.data);
      return budgets.data;
    }
    catch(err:any){
      return {message:err.message};
    }
  },




};
