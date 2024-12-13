import React, { useState, useEffect } from 'react';
import { transactionsService } from '../services/transactions.service';
import { Transaction, TransactionFilters } from '../types/transaction';
import './TransactionList.css';  // Import the CSS file

const TransactionList: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filters, setFilters] = useState<TransactionFilters>({ date: 'last-week' });  
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

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

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">An error occurred: {error}</div>;

  return (
    <div className="transaction-list">
      <h3>Transaction List</h3>
      <div className="filters">
        <select name="date" onChange={handleFilterChange} value={filters.date || ''}>
          <option value="">All Time</option>
          <option value="last-week">Last Week</option>
          <option value="last-month">Last Month</option>
          <option value="last-year">Last Year</option>
        </select>
        <select name="category" onChange={handleFilterChange} value={filters.category || ''}>
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
      <div className="transaction-table">
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction._id}>
                <td>{transaction.type}</td>
                <td>{transaction.category.category}</td>
                <td className={transaction.type == 'expense' ? 'negative' : 'positive'}>
                  {transaction.type == 'expense' ? '-' : '+'} ${Math.abs(transaction.amount).toFixed(2)}
                </td>
                <td>{new Date(transaction.date).toLocaleDateString()}</td>
                <td>{transaction.description}</td>
                <td>
                  <button onClick={() => handleDelete(transaction._id)} className="delete-btn">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionList;
