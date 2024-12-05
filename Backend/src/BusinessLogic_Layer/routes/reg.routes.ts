import express from 'express';
import regController from '../controllers/reg.controllers';

const router = express.Router();
router.post('/', regController.register);
export default router;