const express = require('express');
const mysql = require('mysql');
const constants = require('./constants');

const PORT = 3306;

const connection = mysql.createConnection({
    host: constants.HOST,
    user: constants.USER,
    password: constants.PASSWORD,
    port: PORT,
    database: constants.DATABASE,
    connectTimeout: 20000, // Set the connection timeout to 20 seconds (adjust as needed)
});

// Handle connection errors gracefully
connection.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log('SQL connected');
    }
});

// Function to handle connection errors
function handleConnectionError(err) {
    if (err) {
        console.error('MySQL Connection Error:', err.message);

        // You can take different actions based on the error code or message.
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        } else if (err.code === 'ETIMEDOUT') {
            console.error('Database connection timed out.');
        } else if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.');
        } else if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.');
        }

        // Here, you can decide how to handle the error, such as gracefully exiting the application.
        process.exit(1);
    }
}

const app = express();

app.get("/api", (req, res) => {
    res.json({ "users": ["userOne", "userTwo", "userThree"] });
});

app.post("/signup/register");

app.listen(4000, () => {
    console.log('Server started on port 4000');
});
