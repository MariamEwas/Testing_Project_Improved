import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoutService from '../services/logout.service'; // Import your logout service

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);
  const [confirmLogout, setConfirmLogout] = useState<boolean>(false); // State to show confirmation
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleLogoutClick = () => {
    setConfirmLogout(true); // Show confirmation dialog when Logout is clicked
  };

  const handleLogoutConfirmation = async (confirm: boolean) => {
    if (confirm) {
      try {
        // Call the logout service to perform the logout
        await logoutService();
        // Redirect to login page or home after logout
        navigate('/login');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }
    setConfirmLogout(false); // Close the confirmation dialog
  };

  return (
    <div className="layout pastel-theme">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarVisible ? 'visible' : ''}`}>
        <ul className="sidebar-list">
          <li className="sidebar-item" onClick={() => navigate('/dashboard')}>Dashboard</li>
          <li className="sidebar-item" onClick={() => navigate('/transactions')}>Transactions</li>
          <li className="sidebar-item" onClick={() => navigate('/recommendations')}>Budgets</li>
          <li className="sidebar-item" onClick={handleLogoutClick}>Logout</li> {/* Logout with confirmation */}
        </ul>
      </div>

      {/* Main Content */}
      <div className="content">
        {children}
      </div>

      {/* Menu Icon for Sidebar */}
      <i className="fa-solid fa-bars menu-icon" onClick={toggleSidebar}></i>

      {/* Confirmation Dialog */}
      {confirmLogout && (
        <div className="confirmation-dialog">
          <p>Are you sure you want to log out?</p>
          <button onClick={() => handleLogoutConfirmation(true)}>Yes</button>
          <button onClick={() => handleLogoutConfirmation(false)}>No</button>
        </div>
      )}
    </div>
  );
};

export default Layout;
