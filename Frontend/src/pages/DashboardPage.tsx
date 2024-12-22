import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import { profileService } from '../services/profile.services';
import '../styles/layout.css';
import '../styles/dashbored.css';
import  {visService}  from"../services/visservices"
import { Transaction } from '../types/transaction';
import { transactionsService } from '../services/transactions.service';

import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { Pie, Line } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

const DashboardPage: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [showUpdateProfileForm, setShowUpdateProfileForm] = useState(false);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const [totalIncomeAndExpenses, setTotalIncomeAndExpenses] = useState<any>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
          const filters = {
            date: "2023-12-22", // Example filter
            category: "Groceries", // Example filter
          };
      
          const filteredTransactions = await transactionsService.getAllTransactions(filters);
      
          setTransactions(filteredTransactions);
  
        // Prepare data for the chart
        const labels = filteredTransactions.map((transaction: Transaction) => transaction.date); // Dates for x-axis
        const amounts = filteredTransactions.map((transaction: Transaction) => transaction.amount); // Amounts for y-axis

        setChartData({
          labels,
          datasets: [
            {
              label: "Transaction Amounts",
              data: amounts,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderWidth: 2,
              tension: 0.4,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);
  useEffect(() => {
    const fetchTotalIncomeAndExpenses = async () => {
      try {
        const response = await visService.getTotalIncomeAndExpenses(); 
      
        setTotalIncomeAndExpenses(response)
      } catch (error) {
        console.error("Error fetching total income and expenses:", error);
      }
    };
  
    fetchTotalIncomeAndExpenses();
  }, []);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const toggleUpdateProfileForm = () => {
    setShowUpdateProfileForm((prev) => !prev);
  };
  
  const toggleChangePasswordForm = () => {
    setShowChangePasswordForm((prev) => !prev);
  };

  const [passwordData, setPasswordData] = useState({
    email: '',
    password: '',
  });

    // Pie chart data
    const pieData = totalIncomeAndExpenses && {
      labels: ['Income', 'Expenses'],
      datasets: [
        {
          data: [totalIncomeAndExpenses.income, totalIncomeAndExpenses.expenses],
          backgroundColor: ['#36A2EB', '#FF6384'],
          hoverBackgroundColor: ['#36A2EB', '#FF6384'],
        },
      ],
    };

    
  useEffect(() => {
    // Fetch the profile when the component mounts
    const fetchProfile = async () => {
      try {
        const data = await profileService.getProfile();
        setProfile(data.profile);
      } catch (err: any) {
        setError(err.message || 'Failed to load profile');
      }
    };

    fetchProfile();
  }, []);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await profileService.updateProfile(profileData);
      setShowUpdateProfileForm(false); // Hide the form after submission
      setError(''); // Clear any previous error
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await profileService.changePassword(passwordData);
      setShowChangePasswordForm(false); // Hide the form after submission
      setError(''); // Clear any previous error
    } catch (err: any) {
      setError(err.message || 'Failed to change password');
    }
  };

  return (
    <Layout>
      
      <div className='dashboard-page'>
      <div className="dashboard-container">
        {/* Profile Section */}
        <div className="profile-section">
          {error && <p className="error-message">{error}</p>}
          {profile ? (
            <div className="profile-details">
              <h2 className="greeting">Hello, {profile.name}!</h2>
              <p className="profile-item"><strong>Email:</strong> {profile.email} </p>
              <p className="profile-item"><strong>Phone:</strong> {profile.phone}</p>
              {/* Update Profile Button */}
              <button onClick={toggleUpdateProfileForm}>
  {showUpdateProfileForm ? 'Hide Update Profile' : 'Update Profile'}
</button>
<button onClick={toggleChangePasswordForm}>
  {showChangePasswordForm ? 'Hide Change Password' : 'Change Password'}
</button>
            </div>
          ) : (
            <p>Loading profile...</p>
          )}
        </div>

        {/* Update Profile Form */}
        {showUpdateProfileForm && (
          <form onSubmit={handleUpdateProfile}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleProfileChange}
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleProfileChange}
                required
              />
            </div>
            <div>
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={profileData.phone}
                onChange={handleProfileChange}
                required
              />
            </div>
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setShowUpdateProfileForm(false)}>
              Cancel
            </button>
          </form>
        )}

        {/* Change Password Form */}
        {showChangePasswordForm && (
          <form onSubmit={handleChangePassword}>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={passwordData.email}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div>
              <label>New Password:</label>
              <input
                type="password"
                name="password"
                value={passwordData.password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setShowChangePasswordForm(false)}>
              Cancel
            </button>
          </form>
        )}

        {/* Pink Line Divider */}
        <hr className="divider-line" />

        {/* Dashboard Content */}
        <div className="dashboard-content">
          <h1 className="dashboard-heading">Welcome to Your Dashboard</h1>
          <p className="dashboard-description">Here is a summary of your financial activity.</p>
          <p className="love-message">Love You mariooom ❤️❤️😉</p>
        </div>
          {/* Visualization Section */}
          <div className="visualization-section">
            <h2>Financial Overview</h2>
            <div className='pie'>
            {totalIncomeAndExpenses && (
            <div className="chart-container">
            <h3>Income vs Expenses</h3>
            {totalIncomeAndExpenses ? (
              <Pie  data={pieData} />
            ) : (
              <div className="skeleton">Loading Chart...</div>
            )}
          </div>
            )}
           </div>
           <div>
      <h3>Transaction Line Graph</h3>
      <div className="Line">
      {chartData ? (
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { display: true, position: "top" },
            },
            scales: {
              x: { title: { display: true, text: "Date" } },
              y: { title: { display: true, text: "Amount" } },
            },
          }}
        />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
    </div>
          </div>
      </div>
       
      </div>
    </Layout>
  );
};

export default DashboardPage;
