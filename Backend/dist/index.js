"use strict";
let express = require('express');
let connectDB = require('./Database_Layer/configdb');
//let dotenv = require('dotenv')
console.log('HERRRRRRRRRREEEEEEEEEEEEee');
//dotenv.config();
const app = express();
const PORT = 3000;
// Connect to the database
connectDB();
// Middleware and routes
app.use(express.json());
app.get('/', (req, res) => {
    res.send('API is running...');
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
    console.error('Failed to start the server:', err);
});
