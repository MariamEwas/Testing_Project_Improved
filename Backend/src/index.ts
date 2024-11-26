import routerLoginReg from "./UI_Layer/routes/loginRegRoutes";
import routerProfile from "./UI_Layer/routes/profileRoutes";

let express = require('express')
let connectDB = require('./Database_Layer/configdb');
import swaggerUi from 'swagger-ui-express';

import fs from 'fs';
import yaml from 'js-yaml';
//let dotenv = require('dotenv')

console.log('HERRRRRRRRRREEEEEEEEEEEEee');
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
app.get('/', (req:any, res:any) => {
  res.send('API is running...');
});

app.use('/api/auth/loginReg',routerLoginReg );
app.use('/api/auth/profile',routerProfile);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  }).on('error', (err:any) => {
    console.error('Failed to start the server:', err);
  });