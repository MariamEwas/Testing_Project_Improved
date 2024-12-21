import React from 'react';
import TransactionList from '../components/TransactionList'; // Adjust the import path based on your folder structure
import AddTransaction from '../components/AddTransaction';

import '../styles/layout.css'
import Layout from '../components/layout';

import "../styles/TransactionPage.css"
const TransactionPage: React.FC = () => {
  return (
    <div>
      <Layout> </Layout>
      <div className="transaction-page">
 
        <h1>Transaction Management</h1>
  
          <AddTransaction />
    
          <TransactionList />
 
    </div>
    </div>
  );
};

export default TransactionPage;
