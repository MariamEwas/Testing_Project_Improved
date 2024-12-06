const FormData = require('form-data');
const fs = require('fs');
import axios from 'axios';
import path from 'path';



class PythonService {

    //call the external python code that will generate the recommendation 
    async CallPython(TransactionData: any, BudgetData: any) {
        if (!TransactionData || !BudgetData) {
            //something is wrong with the data recieved
            throw new Error('Some thing is wrong with the data');
        }
        try {
            // create the form that will be sent to the external api
            const form = new FormData();

            //Write both datasets to a csv file
            const csvFilePath = path.join(__dirname, "data.csv");
            fs.writeFileSync(csvFilePath, TransactionData, "utf8");
            const csvFile2Path = path.join(__dirname, "data2.csv");
            fs.writeFileSync(csvFile2Path, BudgetData, "utf8");

            
            //put the files in the form to be sent
            form.append('file1', fs.createReadStream(csvFilePath));
            form.append('file2', fs.createReadStream(csvFile2Path));

            
            //call the python api and get the response ( the recommendation generated)
            const response = await axios.post(process.env.PYTHON_URL!, form, {
                headers: {
                    ...form.getHeaders(),
                },
            });

            return response;
        }
        catch (error) {
            throw new Error('Something went wrong when calling the external api');
        }
    }


}
export default PythonService;