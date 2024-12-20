// import React from 'react';
import {  BrowserRouter as Router,Route, Routes, Navigate } from 'react-router-dom';
import TransactionPage from './pages/TransactionsPage';
import ShowRecommendations from './components/ShowRecommendation';
import { Suspense } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import BudgetPage from './pages/BudgetPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
    <div>
      <h1>Personal Finance Tracker</h1>
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage/>} /> 
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/transactions" element={<TransactionPage />} />
        <Route path="/recommendations" element={<BudgetPage />} />
        <Route path="/home" element={<HomePage />} />

      </Routes>
    </div>
  </Router>
  );
}

export default App;
