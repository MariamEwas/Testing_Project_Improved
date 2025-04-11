import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface VerifyProps {
  email: string;
  onSuccess: () => void;
}

export function MFAVerify({ email, onSuccess }: VerifyProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleVerify = async () => {
    if (!code) {
      setError('Please enter a verification code');
      return;
    }

    try {
      const response = await fetch('/api/mfa/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: code, email }),
      });

      const data = await response.json();

      if (!response.ok || !data.valid) {
        throw new Error('Verification failed');
      }

      // Successful verification - navigate to dashboard
      navigate('/dashboard');
      
      // Also call the onSuccess callback if needed
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed');
    }
  };

  return (
    <div className="mfa-verify">
      <h2>Multi-Factor Authentication</h2>
      <p>Enter the code from your authenticator app:</p>
      
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="6-digit code"
      />
      <button onClick={handleVerify}>Verify</button>
      
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}