import mongoose from 'mongoose';
import TransactionService from '../BusinessLogic_Layer/services/transaction.service';
import Transaction from '../Database_Layer/models/transaction.schema';
import Budget from '../Database_Layer/models/budget.schema';
import User from '../Database_Layer/models/user.schema';
import Category from '../Database_Layer/models/category.schema';
import moment from 'moment';


//Mocking: Replace actual database operations with mock implementations to control
//  and predict their behavior during testing.
jest.mock('../Database_Layer/models/transaction.schema');
jest.mock('../Database_Layer/models/budget.schema');
jest.mock('../Database_Layer/models/user.schema');
jest.mock('../Database_Layer/models/category.schema');

describe('TransactionService', () => {
  let transactionService: TransactionService;
  const mockUserId = new mongoose.Types.ObjectId().toString();
  const mockCategoryId = new mongoose.Types.ObjectId().toString();
  const mockTransactionId = new mongoose.Types.ObjectId().toString();

  beforeEach(() => {
    jest.clearAllMocks(); //Resets all mocked functions.

    transactionService = new TransactionService();
  });


  //(Not Happy Scenario )
  //As a user, I want to receive clear error messages when something goes wrong 
  //(e.g., invalid category or budget limit exceeded), So that I understand what needs to be fixed.


  //User Story 1: As a user, I want to view all my transactions for a specific period
  //  (e.g., last week, last month, last year), So that I can track my spending and income 
  // trends over time.

  describe('getAllTransactions', () => {
    it('should return all transactions for a user', async () => {
      const mockTransactions = [{ _id: mockTransactionId, amount: 100 }]; 
      //jest.fn : Jest utility that creates a mock function, allowing you to simulate the behavior of real functions during testing.
      const mockPopulate = jest.fn().mockResolvedValue(mockTransactions); //Returns a promise resolving to mockTransactions
      const mockFind = jest.fn().mockReturnValue({ populate: mockPopulate });
      (Transaction.find as jest.Mock) = mockFind;


        //When find() is called, it does not execute the actual database query.
        // Instead, it returns an object containing the mocked populate function ({ populate: mockPopulate }).
        // This mimics the chainable behavior of Mongoose queries, such as find().populate().
     
      const result = await transactionService.getAllTransactions(mockUserId, {});
      //assertions :
      expect(result).toEqual(mockTransactions); 
      expect(mockFind).toHaveBeenCalledWith({ userId: mockUserId }); //Ensure find was called with the correct user.
    
    });

    it('should apply date filter when provided', async () => {
      const mockTransactions = [{ _id: mockTransactionId, amount: 100 }];
      const mockPopulate = jest.fn().mockResolvedValue(mockTransactions);
      const mockFind = jest.fn().mockReturnValue({ populate: mockPopulate });
      (Transaction.find as jest.Mock) = mockFind;

      await transactionService.getAllTransactions(mockUserId, { date: 'last-week' });
      expect(mockFind).toHaveBeenCalledWith(expect.objectContaining({
        userId: mockUserId,
        date: expect.any(Object)
      }));
    });

    it('should apply category filter when provided', async () => {
      const mockCategories = [{ _id: mockCategoryId }];
      const mockCategoryFind = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockCategories)
      });

      (Category.find as jest.Mock) = mockCategoryFind;

      const mockTransactions = [{ _id: mockTransactionId, amount: 100 }];
      const mockPopulate = jest.fn().mockResolvedValue(mockTransactions);
      const mockFind = jest.fn().mockReturnValue({ populate: mockPopulate });
      (Transaction.find as jest.Mock) = mockFind;

      await transactionService.getAllTransactions(mockUserId, { category: 'Food' });
      expect(mockFind).toHaveBeenCalledWith(expect.objectContaining({
        userId: mockUserId,
        category: { $in: [mockCategoryId] }
      }));
    });
  });

  describe('getTransactionById', () => {
    it('should return a transaction by ID', async () => {
      const mockTransaction = { _id: mockTransactionId, amount: 100 };
      const mockPopulate = jest.fn().mockResolvedValue(mockTransaction);
      const mockFindOne = jest.fn().mockReturnValue({ populate: mockPopulate });
      (Transaction.findOne as jest.Mock) = mockFindOne;

      const result = await transactionService.getTransactionById(mockTransactionId, mockUserId);
      expect(result).toEqual(mockTransaction);
      expect(mockFindOne).toHaveBeenCalledWith({ _id: mockTransactionId, userId: mockUserId });
    });

    it('should throw an error for invalid transaction ID', async () => {
      await expect(transactionService.getTransactionById('invalid-id', mockUserId))
        .rejects.toThrow('Invalid transaction ID');
    });

    it('should throw an error when transaction is not found', async () => {
      const mockPopulate = jest.fn().mockResolvedValue(null);
      const mockFindOne = jest.fn().mockReturnValue({ populate: mockPopulate });
      (Transaction.findOne as jest.Mock) = mockFindOne;

      await expect(transactionService.getTransactionById(mockTransactionId, mockUserId))
        .rejects.toThrow('Transaction not found');
    });
  });


  //User Stroy 2 :As a user, I want to add a new transaction, specifying whether it is an income or an expense,
  //So that I can keep my financial records up to date.

  describe('addTransaction', () => {
    const mockExpenseData = {
      type: 'expense',
      category: mockCategoryId,
      amount: 50,
      userId: mockUserId,
    };

    const mockIncomeData = {
      type: 'income',
      category: mockCategoryId,
      amount: 100,
      userId: mockUserId,
    };

    it('should add an expense transaction', async () => {
      const mockBudget = { total_spent: 0, limit: 100, save: jest.fn() };
      (Budget.findOne as jest.Mock) = jest.fn().mockResolvedValue(mockBudget);
      (Transaction.create as jest.Mock) = jest.fn().mockResolvedValue(mockExpenseData);

      const result = await transactionService.addTransaction(mockExpenseData);
      expect(result).toEqual(mockExpenseData);
      expect(mockBudget.save).toHaveBeenCalled();
      expect(mockBudget.total_spent).toBe(50);
    });

    it('should add an income transaction', async () => {
      const mockUser = { total_income: 0, save: jest.fn() };
      (User.findById as jest.Mock) = jest.fn().mockResolvedValue(mockUser);
      (Transaction.create as jest.Mock) = jest.fn().mockResolvedValue(mockIncomeData);

      const result = await transactionService.addTransaction(mockIncomeData);
      expect(result).toEqual(mockIncomeData);
      expect(mockUser.save).toHaveBeenCalled();
      expect(mockUser.total_income).toBe(100);
    });

    //User Story 3 :As a user, I want the system to prevent me from adding an expense that exceeds my budget, 
    //So that I can manage my finances responsibly.

    it('should throw an error when expense exceeds budget limit', async () => {
      const mockBudget = { total_spent: 80, limit: 100, save: jest.fn() };
      (Budget.findOne as jest.Mock) = jest.fn().mockResolvedValue(mockBudget);

      await expect(transactionService.addTransaction({ ...mockExpenseData, amount: 30 }))
        .rejects.toThrow('Budget limit exceeded');
    });

    it('should throw an error for invalid transaction type', async () => {
      await expect(transactionService.addTransaction({ ...mockExpenseData, type: 'invalid' }))
        .rejects.toThrow('Invalid transaction type. Must be \'income\' or \'expense\'.');
    });

    it('should throw an error for invalid category ID', async () => {
      await expect(transactionService.addTransaction({ ...mockExpenseData, category: 'invalid-id' }))
        .rejects.toThrow('Invalid category ID');
    });
  });


  //User Story 4 :
  //As a user, I want to delete a transaction that is no longer valid or was added by mistake, 
  //So that my financial records remain accurate.

  describe('deleteTransaction', () => {
    const mockTransaction = {
      _id: mockTransactionId,
      type: 'expense',
      category: mockCategoryId,
      amount: 50,
      userId: mockUserId,
    };

    it('should delete an expense transaction', async () => {
      (Transaction.findOneAndDelete as jest.Mock) = jest.fn().mockResolvedValue(mockTransaction);
      const mockBudget = { total_spent: 50, save: jest.fn() };
      (Budget.findOne as jest.Mock) = jest.fn().mockResolvedValue(mockBudget);

      const result = await transactionService.deleteTransaction(mockTransactionId, mockUserId);
      expect(result).toEqual(mockTransaction);
      expect(mockBudget.save).toHaveBeenCalled();
      expect(mockBudget.total_spent).toBe(0);
    });

    it('should delete an income transaction', async () => {
      const mockIncomeTransaction = { ...mockTransaction, type: 'income' };
      (Transaction.findOneAndDelete as jest.Mock) = jest.fn().mockResolvedValue(mockIncomeTransaction);
      const mockUser = { total_income: 50, save: jest.fn() };
      (User.findById as jest.Mock) = jest.fn().mockResolvedValue(mockUser);

      const result = await transactionService.deleteTransaction(mockTransactionId, mockUserId);
      expect(result).toEqual(mockIncomeTransaction);
      expect(mockUser.save).toHaveBeenCalled();
      expect(mockUser.total_income).toBe(0);
    });

    it('should throw an error for invalid transaction ID', async () => {
      await expect(transactionService.deleteTransaction('invalid-id', mockUserId))
        .rejects.toThrow('Invalid transaction ID');
    });

    it('should throw an error when transaction is not found', async () => {
      (Transaction.findOneAndDelete as jest.Mock) = jest.fn().mockResolvedValue(null);

      await expect(transactionService.deleteTransaction(mockTransactionId, mockUserId))
        .rejects.toThrow('Transaction not found');
    });
  });
});