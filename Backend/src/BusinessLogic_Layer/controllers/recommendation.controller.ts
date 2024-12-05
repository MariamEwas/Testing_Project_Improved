import { Request, Response } from 'express';
import recommendationService from '../services/recommendation.service';
import { JwtPayload } from 'jsonwebtoken';
import axios from 'axios';
import TransactionService from '../services/transaction.service';
import JSONData from '../utils/json-data';
import JSONToCSVAdapter from '../utils/json-to-csv.adapter';
import path from 'path';
import Transaction from '../../Database_Layer/models/transaction.schema';
import Budget from '../../Database_Layer/models/budget.schema';
const FormData = require('form-data');
const fs = require('fs'); // File system module to read files


class RecommendationController {
    static async getRecommendations(req: Request  & { user?: JwtPayload }, res: Response) {
        const id = req.user?.id; 
        if (!id) {
          res.status(400).json({ error: 'User not authenticated' });
          return ;
        }  
        try {
          const user_recommendations = await recommendationService.getRecommendations(id);
          if (!user_recommendations) {
             res.status(404).json({ error: 'recs not found' });
          }
          res.status(200).json({ user_recommendations });
        } catch (error) {    
            res.status(500).json({ error: 'Something went wrong' }); 
        }
      }


      static async createRecommendation(req: Request & { user?: JwtPayload }, res: Response): Promise<void> {
        try {
          const user = req.user;
          if (!user || !user.id) {
          res.status(401).json({ error: 'User not authenticated or invalid token' });
           return ;
          }
          
          const new_recommendation = await recommendationService.createRecommendation(req.body) // Use the `id` from the token
          new_recommendation.save();
          
          res.status(200).json({ new_recommendation });

        } catch (error: any) {
          res.status(400).json({ error: error.message });
        }
      }



    static async generateRecommendation(req: Request& { user?: JwtPayload }, res: Response): Promise<void> {
        
        try{

          const user = req.user;
            if (!user || !user.id) {
            res.status(401).json({ error: 'User not authenticated or invalid token' });
             return ;
            }
            const form = new FormData() ;  

            let Alltransactions_data = await Transaction.find({userId:user.id}).lean();

            Alltransactions_data =Alltransactions_data.filter(trans => trans.type ==='expense' && trans.date <= new Date('02-10-2019'));
            const jsonDataInstance_transaction = new JSONData(Alltransactions_data);
            const adapter_transaction = new JSONToCSVAdapter(jsonDataInstance_transaction,['_id','description','type']);
            const csvData_transaction = adapter_transaction.exportToCSV();
           


            let AllBudget_data = await Budget.find({userId : user.id}).lean();
            const jsonDataInstance_budget = new JSONData(AllBudget_data);
            const adapter_budget = new JSONToCSVAdapter(jsonDataInstance_budget);
            const csvData_budget = adapter_budget.exportToCSV();

            
            const csvFilePath = path.join(__dirname, "data.csv" );
            fs.writeFileSync(csvFilePath, csvData_transaction, "utf8");

            const csvFile2Path = path.join(__dirname, "data2.csv");
            fs.writeFileSync (csvFile2Path,csvData_budget, "utf8");


            form.append('file1', fs.createReadStream(csvFilePath));   // Add the file
            form.append('file2',fs.createReadStream(csvFile2Path));// temp

            const response = await axios.post(process.env.PYTHON_URL!, form, {
                headers: {
                    ...form.getHeaders() , 
                },
            });

            let recommend = {text:response.data.recommends,userId:user.id};
            await recommendationService.createRecommendation(recommend);

            res.status(200).json(response.data);

        } catch (error : any) {
            console.error('Error calling Python API:', error.message);
            res.status(500).json({ error: 'Failed to fetch data from Python API' });
        }
    }
      
 
}
export default RecommendationController;
