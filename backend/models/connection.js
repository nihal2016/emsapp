// Import mysql module to get database connection api provided by node open community.
const mysql = require('mysql');

// Import db configuration to get the database credentials.
const dbconfig = require('../config/db.config');

// Create connection to connect database.
const connection = mysql.createConnection({
    host: dbconfig.host,
    user: dbconfig.user,
    password: dbconfig.password,
    database: dbconfig.database
});

// Establish the connection with the database.
connection.connect(error => {
    if (error) throw error;
    console.log('Successfully connected to the database.');
});

// Export database connection
module.exports = connection;

