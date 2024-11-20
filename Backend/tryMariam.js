console.log('LEH ?');
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Replace with your ngrok URL
const pythonApiUrl = 'https://44ab-34-75-7-39.ngrok-free.app/predict';

let houses = {bedrooms:3,size:2000,age:15};

// POST API to call Python's API
app.post('/call-python', async (req, res) => {
    try {
        const response = await axios.post(pythonApiUrl,houses );
        console.log(response);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error calling Python API:', error.message);
        res.status(500).json({ error: 'Failed to fetch data from Python API' });
    }
});


app.get('/call-python',async (req,res)=>{
    try {
        const response = await axios.get(pythonApiUrl);
        console.log(response);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error calling Python API:', error.message);
        res.status(500).json({ error: 'Failed to fetch data from Python API' });
    }
})

// Server setup
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Node.js server running on port ${PORT}`);
});
