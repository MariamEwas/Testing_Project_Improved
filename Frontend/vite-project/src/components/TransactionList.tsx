import React, { useState, useEffect } from 'react';
import { transactionsService } from '../services/transactions.service';
import { Transaction, TransactionFilters } from '../types/transaction';

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error}</div>;

  return (
    <div>
      <h2>Transactions</h2>
      <div>
        <select name="date" onChange={handleFilterChange} value={filters.date || ''}>
          <option value="">All Time</option>
          <option value="last-week">Last Week</option>
          <option value="last-month">Last Month</option>
          <option value="last-year">Last Year</option>
        </select>
        {/* Category filter */}
        <select name="category" onChange={handleFilterChange} value={filters.category || ''}>
          <option value="">All Categories</option>
          <option value="Household Expenses">Household Expenses</option>
          <option value="entertainment">entertainment</option>
          <option value="gas_transport">gas_transport</option>
          <option value="misc_pos">misc_pos</option>
          <option value="food_dining">food_dining</option>
          <option value="travel">travel</option>
          <option value="shopping_net">shopping_net</option>
          <option value="shopping_pos">shopping_pos</option>
          <option value="personal_care">personal_care</option>
          <option value="health_fitness">health_fitness</option>
          <option value="kids_pets">kids_pets</option>
          <option value="misc_net">misc_net</option>
          <option value="grocery_pos">grocery_pos</option>
          <option value="grocery_net">grocery_net</option>
          <option value="home">home</option>
          <option value="gifts">gifts</option>
          <option value="investments">investments</option>
          <option value="selling items">selling items</option>
          <option value="salary">salary</option>
        </select>
      </div>
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
              <td>{transaction.amount}</td>
              <td>{new Date(transaction.date).toLocaleDateString()}</td>
              <td>{transaction.description}</td>
              <td>
                <button onClick={() => handleDelete(transaction._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
