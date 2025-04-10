import { Request, Response } from 'express';
import MfaService from '../services/mfa.service';

class MfaController {
  private mfaService: MfaService;

  constructor(mfaService: MfaService) {
    this.mfaService = mfaService;
  }

  // POST /mfa/setup
  async setup(req: Request, res: Response) {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    try {
      const { base32, otpauth_url } = this.mfaService.generateSecret(email);

      if (!otpauth_url) {
        return res.status(500).json({ error: 'OTP Auth URL generation failed' });
      }

      const qrCode = await this.mfaService.generateQRCode(otpauth_url);

      // TODO: Save base32 with the user in DB
      return res.status(200).json({ base32, qrCode });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to setup MFA' });
    }
  }

  // POST /mfa/verify
  async verify(req: Request, res: Response) {
    const { token, base32 } = req.body;
    if (!token || !base32) {
      return res.status(400).json({ error: 'Token and secret are required' });
    }

    try {
      const isValid = this.mfaService.verifyToken(token, base32);
      return res.status(200).json({ valid: isValid });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Verification failed' });
    }
  }
}

export default MfaController;