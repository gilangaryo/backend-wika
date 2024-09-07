const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const QRCode = require('qrcode');
const dotenv = require('dotenv');
dotenv.config();

// const swaggerUi = require('swagger-ui-express');
// // const YAML = require('yamljs');
// // const swaggerDocument = YAML.load('./swagger.yaml');

const PORT = process.env.PORT || 5002;
const app = express();
app.use(express.json());

app.use(morgan('dev'))
app.use(morgan(':date[web]'))
app.use(cors());

const userController = require("./route/user/user.controller.js");
const poleController = require("./route/pole/pole.controller.js");
const taskController = require("./route/task/task.controller.js");


app.get('/', (req, res) => {
    res.send('Welcome to WIKA API!');
});
app.get('/api', (req, res) => {
    res.send(`
        <h1>API Endpoints Documentation</h1>
        <ul>
            <li><strong>Users</strong></li>
            <ul>
                <li><strong>GET</strong> <a href="/api/users" target="_blank">/api/users</a> - Get all users</li>
                <li><strong>GET</strong> <a href="/api/users/:id" target="_blank">/api/users/:id</a> - Get user by ID</li>
                <li><strong>POST</strong> <a href="#" target="_blank">/api/users</a> - Create a new user (use Postman or a client to send a POST request)</li>
                <li><strong>PUT</strong> <a href="#" target="_blank">/api/users/:id</a> - Update user by ID (use Postman or a client to send a PUT request)</li>
                <li><strong>DELETE</strong> <a href="#" target="_blank">/api/users/:id</a> - Delete user by ID</li>
            </ul>
            
            <li><strong>Poles</strong></li>
            <ul>
                <li><strong>GET</strong> <a href="/api/poles" target="_blank">/api/poles</a> - Get all poles</li>
                <li><strong>GET</strong> <a href="/api/poles/:id" target="_blank">/api/poles/:id</a> - Get pole by ID</li>
                <li><strong>POST</strong> <a href="#" target="_blank">/api/poles</a> - Create a new pole (use Postman or a client to send a POST request)</li>
                <li><strong>PUT</strong> <a href="#" target="_blank">/api/poles/:id</a> - Update pole by ID (use Postman or a client to send a PUT request)</li>
                <li><strong>DELETE</strong> <a href="#" target="_blank">/api/poles/:id</a> - Delete pole by ID</li>
            </ul>

            <li><strong>Tasks</strong></li>
            <ul>
                <li><strong>GET</strong> <a href="/api/tasks" target="_blank">/api/tasks</a> - Get all tasks</li>
                <li><strong>GET</strong> <a href="/api/tasks/:id" target="_blank">/api/tasks/:id</a> - Get task by ID</li>
                <li><strong>POST</strong> <a href="#" target="_blank">/api/tasks</a> - Create a new task (use Postman or a client to send a POST request)</li>
                <li><strong>PUT</strong> <a href="#" target="_blank">/api/tasks/:id</a> - Update task by ID (use Postman or a client to send a PUT request)</li>
                <li><strong>DELETE</strong> <a href="#" target="_blank">/api/tasks/:id</a> - Delete task by ID</li>
            </ul>
        </ul>
    `);
});



// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/users", userController);
app.use("/api/poles", poleController);
app.use("/api/tasks", taskController);




app.get('/api/generateQR', async (req, res) => {
    try {
        const id = req.query.id;
        const qrCodeImage = await QRCode.toDataURL(id);
        res.send(`<img src="${qrCodeImage}" alt="QR Code"/>`);
    } catch (err) {
        console.error('Error generating QR code:', err);
        res.status(500).send('Internal Server Error');
    }
});


// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});


app.listen(PORT, () => {
    console.log('Server running port: ', PORT);
});