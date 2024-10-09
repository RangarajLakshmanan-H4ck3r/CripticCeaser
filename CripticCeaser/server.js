// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const PORT = process.env.PORT || 3000;

// MySQL connection
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root', // Replace with your MySQL username
    password: 'Ranga@2005', // Replace with your MySQL password
    database: 'database_table'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route for sign up
app.post('/signup', (req, res) => {
    const { email, name, password } = req.body;
    const newUser = { email, name, password };

    connection.query('INSERT INTO users SET ?', newUser, (err, result) => {
        if (err) {
            console.error('Error saving user:', err);
            res.status(500).send('Error saving user');
            return;
        }
        console.log('User signed up successfully');
        res.status(200).send('User signed up successfully');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
