// pages/MFAPage.tsx
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MFASetup } from '../components/Setup';
import { MFAVerify } from '../components/Verify';

export function MFAPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSetup, setIsSetup] = useState(false);

  useEffect(() => {
    if (!location.state?.email) {
      navigate('/login'); // Redirect if no email
    } else {
      setEmail(location.state.email);
      setIsSetup(location.state.isSetupRequired);
    }
  }, [location, navigate]);

  const handleSetupComplete = () => {
    // After setup, switch to verification
    setIsSetup(false); 
  };

  const handleVerifySuccess = () => {
    navigate('/dashboard');
  };

  return (
    <div className="mfa-container">
      {isSetup ? (
        <MFASetup email={email} onComplete={handleSetupComplete} />
      ) : (
        <MFAVerify email={email} onSuccess={handleVerifySuccess} />
      )}
    </div>
  );
}