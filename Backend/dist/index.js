"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const login_routes_1 = __importDefault(require("./BusinessLogic_Layer/routes/login.routes"));
const reg_routes_1 = __importDefault(require("./BusinessLogic_Layer/routes/reg.routes"));
const profile_routes_1 = __importDefault(require("./BusinessLogic_Layer/routes/profile.routes"));
const recommendation_routes_1 = __importDefault(require("./BusinessLogic_Layer/routes/recommendation.routes"));
const budget_routes_1 = __importDefault(require("./BusinessLogic_Layer/routes/budget.routes"));
const transaction_routes_1 = __importDefault(require("./BusinessLogic_Layer/routes/transaction.routes"));
let express = require('express');
let connectDB = require('./Database_Layer/configdb');
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const fs_1 = __importDefault(require("fs"));
const js_yaml_1 = __importDefault(require("js-yaml"));
//let dotenv = require('dotenv')
//dotenv.config();
const app = express();
const PORT = 3000;
// Connect to the database
connectDB();
//load yaml file 
const swaggerDocument = js_yaml_1.default.load(fs_1.default.readFileSync('./src/swagger.yaml', 'utf8'));
// Middleware and routes
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.use(express.json());
app.get('/', (req, res) => {
    res.send('API is running...');
});
app.use('/api/auth/login', login_routes_1.default);
app.use('/api/auth/profile', profile_routes_1.default);
app.use('/api/auth/reg', reg_routes_1.default);
app.use('/recommendation', recommendation_routes_1.default);
app.use('/budgets', budget_routes_1.default);
app.use('/transactions', transaction_routes_1.default);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
    console.error('Failed to start the server:', err);
});
