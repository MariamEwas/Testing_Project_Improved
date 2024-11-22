// Why class-based version of controllers???->

// The controller focuses only on request/response handling, while the service layer
// handles the business logic (database interactions, calculations, etc.). 
// This separation of concerns helps maintain clarity and simplifies unit testing.

// import { Request, Response } from 'express';
// import {TransactionService} from '../services/transactionService'; // Assume the service file exists

// class TransactionController {
//   private transactionService: TransactionService;

//   constructor(transactionService: TransactionService) {
//     this.transactionService = transactionService;
//   }

//

// }

// export default TransactionController;
