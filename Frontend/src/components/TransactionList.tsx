import React, { useState, useEffect } from 'react';
import { transactionsService } from '../services/transactions.service';
import { Transaction, TransactionFilters } from '../types/transaction';

const TransactionList: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filters, setFilters] = useState<TransactionFilters>({ date: 'last-week' });  
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [transactionsPerPage] = useState<number>(10); // Set how many transactions per page

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const data = await transactionsService.getAllTransactions(filters);
        setTransactions(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch transactions');
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [filters]); 

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await transactionsService.deleteTransaction(id);
        setTransactions(transactions.filter((transaction) => transaction._id !== id));
      } catch (err) {
        setError('Failed to delete transaction');
      }
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Pagination logic
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  if (loading) return <div className="loading-message">Loading...</div>;
  if (error) return <div className="error-message">An error occurred: {error}</div>;

  return (
    <div className="transactionlist">
      <div className="transaction-list-container">
        <h3 className="transaction-list-header">Transaction List</h3>
        <div className="filters-container">
          <select name="date" onChange={handleFilterChange} value={filters.date || ''} className="filters-select">
            <option value="">All Time</option>
            <option value="last-week">Last Week</option>
            <option value="last-month">Last Month</option>
            <option value="last-year">Last Year</option>
          </select>
          <select name="category" onChange={handleFilterChange} value={filters.category || ''} className="filters-select">
          <option value="">All Categories</option>
          <option value="Household Expenses">Household Expenses</option>
          <option value="entertainment">Entertainment</option>
          <option value="gas_transport">Gas & Transport</option>
          <option value="misc_pos">Miscellaneous POS</option>
          <option value="food_dining">Food & Dining</option>
          <option value="travel">Travel</option>
          <option value="shopping_net">Online Shopping</option>
          <option value="shopping_pos">Shopping POS</option>
          <option value="personal_care">Personal Care</option>
          <option value="health_fitness">Health & Fitness</option>
          <option value="kids_pets">Kids & Pets</option>
          <option value="misc_net">Miscellaneous Net</option>
          <option value="grocery_pos">Grocery POS</option>
          <option value="grocery_net">Grocery Net</option>
          <option value="home">Home</option>
          <option value="gifts">Gifts</option>
          <option value="investments">Investments</option>
          <option value="selling items">Selling Items</option>
          <option value="salary">Salary</option>
        </select>
        </div>
        <div className="transaction-table-container">
          <table className="transaction-table">
            <thead>
              <tr className="transaction-table-header">
                <th>Type</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="transaction-table-body">
              {currentTransactions.map((transaction) => (
                <tr key={transaction._id} className="transaction-table-row">
                  <td className="transaction-type">{transaction.type}</td>
                  <td className="transaction-category">{transaction.category.category}</td>
                  <td className={`transaction-amount ${transaction.type === 'expense' ? 'negative' : 'positive'}`}>
                    {transaction.type === 'expense' ? '-' : '+'} ${Math.abs(transaction.amount).toFixed(2)}
                  </td>
                  <td className="transaction-date">{new Date(transaction.date).toLocaleDateString()}</td>
                  <td className="transaction-description">{transaction.description}</td>
                  <td className="transaction-actions">
                    <button onClick={() => handleDelete(transaction._id)} className="delete-btn">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination-controls">
          <button 
            onClick={() => paginate(currentPage - 1)} 
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            Previous
          </button>
          <span className="pagination-page">Page {currentPage} of {totalPages}</span>
          <button 
            onClick={() => paginate(currentPage + 1)} 
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
