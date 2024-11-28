import { Request, Response } from 'express';
import recommendation from '../services/recommendation.service';
import { JwtPayload } from 'jsonwebtoken';
import axios from 'axios';
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
          const user_recommendations = await recommendation.getRecommendations(id);
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

          const new_recommendation = await recommendation.createRecommendation(req.body) // Use the `id` from the token
          
          
          res.status(200).json({ new_recommendation });

        } catch (error: any) {
          res.status(400).json({ error: error.message });
        }
      }



    static async generateRecommendation(req: Request & { user?: JwtPayload }, res: Response): Promise<void> {
        
        try{
            const pythonApiUrl = 'https://5169-35-199-18-193.ngrok-free.app/recommend';

            const form = new FormData();
            const filePath = '../../Testing_Project/transactions.csv'; //temp
            // suppose to:
            /** 
            *call the transactions from the database
            // create a function that (Adapter design pattern) that will convert the 
            //json file to csv 
            // and then send this file to the python code
            */

            form.append('file1', fs.createReadStream(filePath)); // Add the file
            form.append('file2',fs.createReadStream('../../Testing_Project/budget.csv')) // temp
            const response = await axios.post(pythonApiUrl, form, {
                headers: {
                    ...form.getHeaders(), 
                },
            });

            console.log(response.data);
            //I suppose to also put it in the database !

            res.status(200).json(response.data);

        } catch (error : any) {
            console.error('Error calling Python API:', error.message);
            res.status(500).json({ error: 'Failed to fetch data from Python API' });
        }
    }
      
 
}
export default RecommendationController;
