const express = require('express');
const mysql = require('mysql');
const constants = require('./constants');
const cors = require('cors');
const socketIo = require('socket.io');
const http = require('http');

const PORT = 4000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());

app.use(express.json());

const db = mysql.createConnection({
    host: constants.HOST,
    user: constants.USER,
    password: constants.PASSWORD,
    database: constants.DATABASE,
    charset: 'utf8mb4',
});

db.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log('SQL connected');
    }
});

io.on('connection', (socket) => {
    console.log('A user connected');
  
    // Send a message to the browser console when the socket is connected
    socket.emit('messageToConsole', 'Hello from the server!');
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

// Posts and comments methods

app.get("/getPostsByUserID", (req, res) => {
    const user_id = req.query.user_id;

    const sql = `SELECT * FROM ${constants.POST_TABLE} WHERE ${constants.COL_POST_USER_ID} = ?`;

    db.query(sql, [user_id], (err, result) => {
        if (err) {
            res.json({ posts: sql });
            console.error('/getPostsByUserID: Error retrieving posts: ' + err.message);
            res.status(500).json({ message: '/getPostsByUserID: Failed to retrieve posts' });
        } else {
            res.json(result);
        }
    });
});


app.post("/deletePost", (req, res) => {
    const { post_id } = req.body;

    const sql = `DELETE FROM ${constants.POST_TABLE} WHERE ${constants.COL_POST_ID} = ?`;

    db.query(sql, [post_id], (err, result) => {
        if (err) {
            console.error('/deletePost: Error deleting post: ' + err.message);
            res.status(500).json({ message: '/deletePost: Delete post failed' });
        } else {
            if (result.affectedRows > 0) {
                res.json({ message: '/deletePost: Post deleted successfully' });
            } else {
                res.status(404).json({ message: '/deletePost: Post not found' });
            }
        }
    });
});


app.post("/createPost", (req, res) => {
    
const { user_id, caption, attachment_file, comments_privacy, comments,
    attachment_file_name, attachment_type, post_privacy, post_type, creation_date, 
    reactions, likes, tips } = req.body;
    const sql = `INSERT INTO ${constants.POST_TABLE} (${constants.COL_POST_USER_ID}, ${constants.COL_CAPTION}, ${constants.COL_ATTACHMENT_FILE},
        ${constants.COL_COMMENTS_PRIVACY}, ${constants.COL_COMMENTS}, ${constants.COL_ATTACHMENT_FILE_NAME}, ${constants.COL_ATTACHMENT_TYPE}, 
        ${constants.COL_POST_PRIVACY}, ${constants.COL_POST_TYPE}, ${constants.COL_CREATION_DATE}, ${constants.COL_REACTIONS}, 
        ${constants.COL_LIKES}, ${constants.COL_TIPS}) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        db.query(sql, [user_id, caption, attachment_file, comments_privacy, comments, attachment_file_name, attachment_type, post_privacy,
        post_type, creation_date, reactions, likes, tips], (err, result) => {
            if (err) {
                console.error('/createPost: Error inserting post: ' + err.message);
                res.status(500).json({ message: '/createPost: Create post failed' });
            }
            else {
                res.json({ message: '/createPost: Post creation complete' });
            }
        });
});

app.post("/updatePost", (req, res) => {
    console.error("updating post");
    const {
        id,
        user_id,
        caption,
        attachment_file,
        comments_privacy,
        comments,
        attachment_file_name,
        attachment_type,
        post_privacy,
        post_type,
        creation_date,
        reactions,
        likes,
        tips
    } = req.body;

    const sql = `UPDATE ${constants.POST_TABLE} 
                 SET ${constants.COL_CAPTION} = ?,
                     ${constants.COL_ATTACHMENT_FILE} = ?,
                     ${constants.COL_COMMENTS_PRIVACY} = ?,
                     ${constants.COL_COMMENTS} = ?,
                     ${constants.COL_ATTACHMENT_FILE_NAME} = ?,
                     ${constants.COL_ATTACHMENT_TYPE} = ?,
                     ${constants.COL_POST_PRIVACY} = ?,
                     ${constants.COL_POST_TYPE} = ?,
                     ${constants.COL_CREATION_DATE} = ?,
                     ${constants.COL_REACTIONS} = ?,
                     ${constants.COL_LIKES} = ?,
                     ${constants.COL_TIPS} = ?
                 WHERE ${constants.COL_POST_ID} = ?`;

    db.query(
        sql,
        [
            caption,
            attachment_file,
            comments_privacy,
            comments,
            attachment_file_name,
            attachment_type,
            post_privacy,
            post_type,
            creation_date,
            reactions,
            likes,
            tips,
            id
        ],
        (err, result) => {
            if (err) {
                console.error('/updatePost: Error updating post: ' + err.message);
                res.json({ message: '/updatePost: Update post failed: ' + err.message });
            } else {
                res.json({ message: '/updatePost: Post update complete' });
            }
        }
    );
});


app.post("/signup", (req, res) => {
    const { user_id, account_type, username, firstname, lastname, email, password, date_joined, creator_mode } = req.body;
    const sql = `INSERT INTO ${constants.USER_TABLE} (${constants.COL_USER_ID}, ${constants.COL_USERNAME}, ${constants.COL_FIRSTNAME},
        ${constants.COL_LASTNAME}, ${constants.COL_EMAIL}, ${constants.COL_PASSWORD}, ${constants.COL_CREATOR_MODE}, ${constants.COL_DATE_JOINED}, 
        ${constants.COL_ACCOUNT_TYPE}) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(sql, [user_id, username, firstname, lastname, email, password, creator_mode, date_joined, account_type], (err, result) => {
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
    verification_doc, docs_verified, bio, dob, profile_picture, cover_picture, subscribers, connections, 
    subscription_price, currency_symbol, verified, live_mode, profile_setup, creator_mode_desc_dismissed } = req.body;
    const sql = `UPDATE ${constants.USER_TABLE} set ${constants.COL_FIRSTNAME} = ?, ${constants.COL_USERNAME} = ?, ${constants.COL_LASTNAME} = ?, ${constants.COL_PASSWORD} = ?, 
        ${constants.COL_CREATOR_MODE} = ?, ${constants.COL_PHONE_NUMBER} = ?, ${constants.COL_COUNTRY} = ?, ${constants.COL_LOCATION} = ?, 
        ${constants.COL_VERIFICATION_DOC} = ?, ${constants.COL_DOCS_VERIFIED} = ?, ${constants.COL_BIO} = ?, ${constants.COL_DOB} = ?, ${constants.COL_LAST_UPDATED} = ?, 
        ${constants.COL_PROFILE_PICTURE} = ?, ${constants.COL_COVER_PICTURE} = ?, ${constants.COL_SUBSCRIBERS} = ?, ${constants.COL_CONNECTIONS} = ?, 
        ${constants.COL_SUBSCRIPTION_PRICE} = ?, ${constants.COL_CREATOR_MODE_DESC_DISMISSED} = ?, ${constants.COL_CURRENCY_SYMBOL} = ?, ${constants.COL_VERIFIED} = ?, ${constants.COL_LIVE_MODE} = ?, 
        ${constants.COL_PROFILE_SETUP} = ? where ${constants.COL_USER_ID} = ?`;
        console.log("user_id"+user_id);
    db.query(sql, [firstname, username, lastname, password, creator_mode, phone_number, country, location, verification_doc, docs_verified, bio, dob, last_updated, 
        profile_picture, cover_picture, subscribers, connections, subscription_price, creator_mode_desc_dismissed, currency_symbol, verified, live_mode, profile_setup, user_id], (err, result) => {
            if (err) {
                console.error('/updateUser: Error updating user: ' + err.message);
                res.status(500).json({ message: '/updateUser: User update failed' });
            }
            else {
                console.log('/updateUser: User updated');
                res.json({ message: '/updateUser: User updated' });
            }
        })
});

app.get("/getAppUserByEmail", (req, res) => {
    const email = req.query.email;
    const sql = `SELECT * from ${constants.USER_TABLE} where ${constants.COL_EMAIL} = ?`;
    db.query(sql, [email], (err, result) => {
        if (err) {
            console.error("/getAppUserByEmail: An error occurred: " + err);
            res.status(500).json({ message: '/getAppUserByEmail: An error occurred, check console' });
        }
        else {
            res.json(result);
        }
    });
});

app.get("/getAppUserByID", (req, res) => {
    const user_id = req.query.user_id;
    const sql = `SELECT * from ${constants.USER_TABLE} where ${constants.COL_USER_ID} = ?`;
    db.query(sql, [user_id], (err, result) => {
        if (err) {
            console.error("/getAppUserByID: An error occurred: " + err);
            res.status(500).json({ message: '/getAppUserByID: An error occurred, check console' });
        }
        else {
            res.json(result);
        }
    });
});

app.get("/getAppUserByUsername", (req, res) => {
    const username = req.query.username;
    const sql = `SELECT * from ${constants.USER_TABLE} where ${constants.COL_USERNAME} = ?`;
    db.query(sql, [username], (err, result) => {
        if (err) {
            console.error("/getAppUserByUsername: An error occurred: " + err);
            res.status(500).json({ message: '/getAppUserByUsername: An error occurred, check console' });
        }
        else {
            res.json(result);
        }
    });
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
            res.status(500).json({ message: '/checkEmail: An error occurred. ' + err });
        }
        else {
            res.json(result);
        }
    });
});

app.listen(PORT, () => {
    console.error(`Server started on port ${PORT}`);
});
