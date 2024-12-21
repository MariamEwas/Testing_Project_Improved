import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="layout pastel-theme">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarVisible ? 'visible' : ''}`}>
        <ul className="sidebar-list">
          <li className="sidebar-item" onClick={() => navigate('/dashboard')}>Dashboard</li>
          <li className="sidebar-item" onClick={() => navigate('/transactions')}>Transactions</li>
          <li className="sidebar-item" onClick={() => navigate('/recommendations')}>Budgets</li>
       <li className="sidebar-item" onClick={() => navigate('/recommendations')}>Logout</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="content">
        {children}
      </div>

      {/* Menu Icon for Sidebar */}
      <i className="fa-solid fa-bars menu-icon" onClick={toggleSidebar}></i>
    </div>
  );
};

export default Layout;
