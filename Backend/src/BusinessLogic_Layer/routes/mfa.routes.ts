import express, { Request, Response, RequestHandler } from 'express';
import MfaController from '../controllers/mfa.controller';
import MfaService from '../services/mfa.service';

const router = express.Router();
const mfaService = new MfaService();
const mfaController = new MfaController(mfaService);

// Use arrow functions and handle response directly
const setupHandler: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  await mfaController.setup(req, res);
};

const verifyHandler: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  await mfaController.verify(req, res);
};

router.post('/setup', setupHandler);
router.post('/verify', verifyHandler);

export default router;