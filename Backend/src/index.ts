import loginRouter from "./BusinessLogic_Layer/routes/login.routes";
import regRouter from "./BusinessLogic_Layer/routes/reg.routes";
import profileRouter from "./BusinessLogic_Layer/routes/profile.routes";
import RecommendationRouter from './BusinessLogic_Layer/routes/recommendation.routes'
import BudgetRouter from './BusinessLogic_Layer/routes/budget.routes'
import TransactionRouter from './BusinessLogic_Layer/routes/transaction.routes'
import VisRouter from "./BusinessLogic_Layer/routes/vis.routes";
let express = require('express')
let connectDB = require('./Database_Layer/configdb');
import swaggerUi from 'swagger-ui-express';

import fs from 'fs';
import yaml from 'js-yaml';
//let dotenv = require('dotenv')

//dotenv.config();
const app = express();
const PORT = 3000;
// Connect to the database
connectDB();
//load yaml file 

const swaggerDocument = yaml.load(fs.readFileSync('./src/swagger.yaml', 'utf8')) as object;

// Middleware and routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.get('/', (req:any, res:any) => { // for test
  res.send('API is running...');
});

app.use('/api/auth/login',loginRouter );
app.use('/api/auth/profile',profileRouter);
app.use('/api/auth/reg',regRouter);
app.use('/recommendation',RecommendationRouter);
app.use('/budgets',BudgetRouter);
app.use('/transactions',TransactionRouter);
app.use('/visualisations',VisRouter);


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  }).on('error', (err:any) => {
    console.error('Failed to start the server:', err);
});