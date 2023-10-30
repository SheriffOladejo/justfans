const express = require('express');
const mysql = require('mysql');
const constants = require('./constants');
const cors = require('cors');

const PORT = 4000;

const app = express();

app.use(cors());

app.use(express.json());

const db = mysql.createConnection({
    host: constants.HOST,
    user: constants.USER,
    password: constants.PASSWORD,
    database: constants.DATABASE
});

db.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log('SQL connected');
    }
});

app.get("/api", (req, res) => {
    res.json({ "users": ["userOne", "userTwo", "userThree"] });
});

app.post("/signup", (req, res) => {
    const { user_id, username, firstname, lastname, email, password, date_joined, creator_mode } = req.body;
    const sql = `INSERT INTO ${constants.USER_TABLE} (user_id, username, firstname, lastname, email, password, creator_mode, date_joined) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(sql, [user_id, username, firstname, lastname, email, password, creator_mode, date_joined], (err, result) => {
        if (err) {
            console.error('Error inserting user: ' + err.message);
            res.status(500).json({ message: 'Signup failed' });
        }
        else {
            res.json({ message: 'Signup complete' });
        }
    });
});

app.get("/checkUsername", (req, res) => {
    const username = req.query.username;
    const sql = `SELECT * from ${constants.USER_TABLE} where ${constants.COL_USERNAME} = ?`;
    db.query(sql, [username], (err, result) => {
        if (err) {
            console.error("server.js: /checkUsername: An error occurred: " + err);
            res.status(500).json({ message: 'An error occurred, check console' });
        }
        else {
            res.json(result);
        }
    });
});

app.get("/checkEmail", (req, res) => {
    const email = req.query.email;
    const sql = `SELECT * from ${constants.USER_TABLE} where ${constants.COL_EMAIL} = ?`;
    db.query(sql, [email], (err, result) => {
        if (err) {
            console.error("server.js: /checkEmail: An error occurred: " + err);
            res.status(500).json({ message: 'An error occurred, check console' });
        }
        else {
            res.json(result);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
