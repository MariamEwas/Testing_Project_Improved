import express from 'express';
import LoginController from '../controllers/login.controllers';
import LoginService from '../services/login.services';
import { Request ,Response } from 'express';
const router = express.Router();

// Create an instance of LoginService
const loginService = new LoginService();
// Create an instance of LoginController and pass the loginService
const loginController = new LoginController(loginService);

// Define the login route and link it to the controller method
router.post('/', (req, res) => loginController.login(req, res));

export default router;
