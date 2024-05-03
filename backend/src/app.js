const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const db = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Basic route
app.get('/', (req, res) => {
    res.send('Hello from SAFE Bank App Backend!');
});

// testing DB connection
// app.get('/testdb', async (req, res) => {
//     try {
//         const [rows, fields] = await db.query('SELECT 1 + 1 AS solution');
//         res.json({ solution: rows[0].solution });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Database connection error');
//     }
// });

module.exports = app;