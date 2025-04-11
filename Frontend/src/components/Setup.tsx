import { useState } from 'react';
import { useEffect } from 'react';
interface SetupProps {
  email: string;
  onComplete: () => void;
}

// components/mfa/Setup.tsx
export function MFASetup({ email, onComplete }: { email: string, onComplete: () => void }) {
    const [qrCode, setQrCode] = useState('');
    const [secret, setSecret] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [error, setError] = useState('');
  
    useEffect(() => {
      const setup = async () => {
        const res = await fetch('/api/mfa/setup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
  
        const { qrCode, base32 } = await res.json();
        setQrCode(qrCode);
        setSecret(base32);
      };
      setup();
    }, [email]);
  
    const verifySetup = async () => {
      try {
        const res = await fetch('/api/mfa/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: verificationCode, base32: secret }),
        });
  
        const data = await res.json();
        if (!res.ok || !data.valid) {
          throw new Error('Invalid verification code');
        }
  
        // Proceed to MFA verification screen
        onComplete(); 
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Verification failed');
      }
    };
  
    return (
      <div>
        <h2>Scan QR Code</h2>
        <img src={qrCode} alt="MFA QR Code" />
        <input 
          type="text" 
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          placeholder="Enter 6-digit code"
        />
        <button onClick={verifySetup}>Verify Setup</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    );
  }
  