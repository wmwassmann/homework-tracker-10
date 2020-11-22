const util = require('util');
const mysql = require('mysql');

// Simple MySQL connection function. 

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'password',
    database: 'nfl_roster'
});

connection.connect();

connection.query = util.promisify(connection.query);

module.exports = connection;