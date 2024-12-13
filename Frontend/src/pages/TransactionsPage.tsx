import React from 'react';
import TransactionList from '../components/TransactionList'; // Adjust the import path based on your folder structure
import AddTransaction from '../components/AddTransaction';
import './TransactionPage.css';  // Import the custom CSS file for the page

const TransactionPage: React.FC = () => {
  return (
    <div className="transaction-page">
      <header>
        <h1>Transaction Management</h1>
      </header>
      <main>
        <div className="add-transaction">
          <AddTransaction />
        </div>
        <div className="transaction-list">
          <TransactionList />
        </div>
      </main>
    </div>
  );
};

export default TransactionPage;
