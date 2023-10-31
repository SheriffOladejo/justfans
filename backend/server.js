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
    const sql = `INSERT INTO ${constants.USER_TABLE} (${constants.COL_USER_ID}, ${constants.COL_USERNAME}, ${constants.COL_FIRSTNAME},
        ${constants.COL_LASTNAME}, ${constants.COL_EMAIL}, ${constants.COL_PASSWORD}, ${constants.COL_CREATOR_MODE}, ${constants.COL_DATE_JOINED}) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(sql, [user_id, username, firstname, lastname, email, password, creator_mode, date_joined], (err, result) => {
        if (err) {
            console.error('/signup: Error inserting user: ' + err.message);
            res.status(500).json({ message: '/signup: Signup failed' });
        }
        else {
            res.json({ message: '/signup: Signup complete' });
        }
    });
});

app.post("/updateUser", (req, res) => {
    const last_updated = Date.now();
    const { user_id, username, firstname, lastname, password, creator_mode, phone_number, country, location,
    verification_doc, docs_verified, bio, profile_picture, cover_picture, subscribers, connections, 
    subscription_price, currency_symbol, verified, live_mode, profile_setup } = req.body;
    const sql = `UPDATE ${constants.USER_TABLE} set ${constants.COL_FIRSTNAME} = ?, ${constants.COL_LASTNAME} = ?, ${constants.COL_PASSWORD} = ?, 
        ${constants.COL_CREATOR_MODE} = ?, ${constants.COL_PHONE_NUMBER} = ?, ${constants.COL_COUNTRY} = ?, ${constants.COL_LOCATION} = ?, 
        ${constants.COL_VERIFICATION_DOC} = ?, ${constants.COL_DOCS_VERIFIED} = ?, ${constants.COL_BIO} = ?, ${constants.COL_LAST_UPDATED} = ?, 
        ${constants.COL_PROFILE_PICTURE} = ?, ${constants.COL_COVER_PICTURE} = ?, ${constants.COL_SUBSCRIBERS} = ?, ${constants.COL_CONNECTIONS} = ?, 
        ${constants.COL_SUBSCRIPTION_PRICE} = ?, ${constants.COL_CURRENCY_SYMBOL} = ?, ${constants.COL_VERIFIED} = ?, ${constants.COL_LIVE_MODE} = ?, 
        ${constants.COL_PROFILE_SETUP} = ? where ${constants.COL_USERNAME} = ?`;
        console.log(sql);
    db.query(sql, [firstname, lastname, password, creator_mode, phone_number, country, location, verification_doc, docs_verified, bio, last_updated, 
        profile_picture, cover_picture, subscribers, connections, subscription_price, currency_symbol, verified, live_mode, profile_setup, username], (err, result) => {
            if (err) {
                console.error('/updateUser: Error updating user: ' + err.message);
                res.status(500).json({ message: '/updateUser: User update failed' });
            }
            else {
                res.json({ message: '/updateUser: User updated' });
            }
        })
});

app.get("/checkUsername", (req, res) => {
    const username = req.query.username;
    const sql = `SELECT * from ${constants.USER_TABLE} where ${constants.COL_USERNAME} = ?`;
    db.query(sql, [username], (err, result) => {
        if (err) {
            console.error("/checkUsername: An error occurred: " + err);
            res.status(500).json({ message: '/checkUsername: An error occurred, check console' });
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
            console.error("/checkEmail: An error occurred: " + err);
            res.status(500).json({ message: '/checkEmail: An error occurred, check console' });
        }
        else {
            res.json(result);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
