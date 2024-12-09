import { Request, Response } from 'express';
import RecommendationService from '../services/recommendation.service';
import { JwtPayload } from 'jsonwebtoken';
import JSONData from '../utils/json-data';
import JSONToCSVAdapter from '../utils/json-to-csv.adapter';
import budgetService from '../services/budget.service';
import PythonService from '../services/python.service';
import TransactionService from '../services/transaction.service';
import BudgetService from '../services/budget.service';


class RecommendationController {

  //inject services that will be needed in the controller
  constructor(private recommendationService: RecommendationService,
    private pythonService: PythonService,
    private transactionService: TransactionService ,
    private budgetService :BudgetService) {
  }


  //get All recommednations realted to a single user 
  async getRecommendations(req: Request & { user?: JwtPayload }, res: Response) {
    try {

      // check if the user is authenticated or not
      const id = req.user?.id;
      if (!id) {
        res.status(400).json({ error: 'User not authenticated' });
        return;
      }

      //get All recommendations that related to one user only
      const user_recommendations = await this.recommendationService.getRecommendations(id);
      if (!user_recommendations) {
        res.status(404).json({ error: 'recs not found' });
      }

      res.status(200).json({ user_recommendations });
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  }




  //Create a recommendation and insert it in the database
  async createRecommendation(req: Request & { user?: JwtPayload }, res: Response): Promise<void> {
    try {

      // check if the user is authenticated or not
      const user = req.user;
      if (!user || !user.id) {
        res.status(401).json({ error: 'User not authenticated or invalid token' });
        return;
      }

      //call the recommendation service to ceate a new recommendation
      const new_recommendation = await this.recommendationService.createRecommendation(req.body) // Use the `id` from the token
      new_recommendation.save();

      res.status(200).json({ new_recommendation });

    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }


  //generate the recommendation from the external api
  async generateRecommendation(req: Request & { user?: JwtPayload }, res: Response): Promise<void> {
    try {

      // check if the user is authenticated or not
      const user = req.user;
      if (!user || !user.id) {
        res.status(401).json({ error: 'User not authenticated or invalid token' });
        return;
      }

      //get All transactions and map them to an appropriate format to send to the Adapter
      let Alltransactions_data = await this.transactionService.getAllTransactions(user.id, req.params);
      let transaction_data = Alltransactions_data.filter(
        trans => trans.category && trans.date <= new Date('2019-02-10') && trans.date >= new Date('2019-01-28')
      ).map(
        trans => ({
          category: trans.category._id,
          amount: trans.amount,
          date: trans.date,
          userId: trans.userId,
        })
      );

      //Apply the Adpater to convert from json to csv 
      const jsonDataInstance_transaction = new JSONData(transaction_data);
      const adapter_transaction = new JSONToCSVAdapter(jsonDataInstance_transaction);
      const csvData_transaction = adapter_transaction.exportToCSV();


      //Get All budgets fron The budgetService and map them to appropriate fromat to use in adpater& python api
      let AllBudget_data = await this.budgetService.getAllBudgets(user.id);
      let budget_data = AllBudget_data.map(budget => ({
        limit: budget.limit,
        category: budget.category._id,
        total_spent: budget.total_spent
      })
      );

      //convert the budget data to csv using the adapter
      const jsonDataInstance_budget = new JSONData(budget_data);
      const adapter_budget = new JSONToCSVAdapter(jsonDataInstance_budget);
      const csvData_budget = adapter_budget.exportToCSV();

      // finally ,call the python api using python service
      let ResponsePython = await this.pythonService.CallPython(csvData_transaction, csvData_budget);
      if (!ResponsePython || ResponsePython.status !== 200) {
        res.status(500).json({ error: 'Failed to fetch data from Python API' });
        return;
      }

      // insert the recommendation we get in the database (collection called recommendation)
      let Newrecommendation = {
        text: ResponsePython.data.recommends,
        userId: user.id,
      };
      await this.recommendationService.createRecommendation(Newrecommendation);

      //ok, no problems at all
      res.status(200).json(ResponsePython.data);
    } catch (error: any) {
      console.error('Error calling Python API:', error.message);
      res.status(500).json({ error: 'Failed to fetch data from Python API' });
    }
  }



}
export default RecommendationController;
