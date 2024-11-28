const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const {spawn} = require('child_process');
const FormData = require('form-data');
const fs = require('fs'); // File system module to read files

const app = express();
app.use(bodyParser.json());


const pythonApiUrl = 'https://5dac-35-199-18-193.ngrok-free.app/recommend';



// POST API to call Python's API

app.post('/call-python', async (req, res) => {
    try {
        // 1. Create a new FormData instance
        const form = new FormData();
        // 2. Append your file (ensure the path exists)
        const filePath = 'D:/DownloadsFolder/transactions.csv'; // Replace with your file path
        form.append('file1', fs.createReadStream(filePath)); // Add the file
        form.append('file2',fs.createReadStream('D:/DownloadsFolder/budget.csv'))
        const response = await axios.post(pythonApiUrl, form, {
            headers: {
                ...form.getHeaders(), // Include `multipart/form-data` headers
            },
        });

        console.log(response.data);
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
