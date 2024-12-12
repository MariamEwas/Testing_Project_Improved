import React from 'react';
import TransactionList from '../components/TransactionList'; // Adjust the import path based on your folder structure

const TransactionPage: React.FC = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ marginBottom: '20px' }}>
        <h1 style={{ textAlign: 'center', color: '#4CAF50' }}>Transaction Management</h1>
      </header>
      <main>
        <TransactionList />
      </main>
    </div>
  );
};

export default TransactionPage;
