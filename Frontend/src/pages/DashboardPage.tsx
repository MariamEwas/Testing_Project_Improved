import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import { profileService } from '../services/profile.services';
import '../styles/layout.css';
import '../styles/dashbored.css';


const DashboardPage: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [showUpdateProfileForm, setShowUpdateProfileForm] = useState(false);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [passwordData, setPasswordData] = useState({
    email: '',
    password: '',
  });

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
              <p className="profile-item"><strong>Email:</strong> {profile.email}</p>
              <p className="profile-item"><strong>Phone:</strong> {profile.phone}</p>
              {/* Update Profile Button */}
              <button onClick={() => setShowUpdateProfileForm(true)}>
                Update Profile
              </button>
              {/* Change Password Button */}
              <button onClick={() => setShowChangePasswordForm(true)}>
                Change Password
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
      </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
