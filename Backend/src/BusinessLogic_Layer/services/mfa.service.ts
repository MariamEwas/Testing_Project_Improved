import speakeasy from 'speakeasy';
import qrcode from 'qrcode';

class MfaService {
  // Generate a secret and OTPAuth URL
  generateSecret(email: string) {
    const secret = speakeasy.generateSecret({
      name: MyApp (${email}), // You can name this based on your app
    });

    return {
      base32: secret.base32,
      otpauth_url: secret.otpauth_url,
    };
  }

  // Generate QR code from OTPAuth URL
  async generateQRCode(otpauth_url: string): Promise<string> {
    try {
      const qrCode = await qrcode.toDataURL(otpauth_url);
      return qrCode;
    } catch (err) {
      throw new Error('Failed to generate QR code');
    }
  }

  // Verify the token with the stored secret
  verifyToken(token: string, base32: string): boolean {
    return speakeasy.totp.verify({
      secret: base32,
      encoding: 'base32',
      token,
      window: 1, // Allows ±1 time step of drift
    });
  }
}

export default MfaService;