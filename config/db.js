'user strict';

const mysql = require('mysql');

//local mysql db connection
const db_server = mysql.createConnection({
  host     : 'localhost',
  user     : 'PLACEHOLDER',
  password : 'PLACEHOLDER',
});

db_server.connect((err) => {
    if (err) {
      console.log("Database Server Connection Failed !!!", err);
    } else {
      console.log("Successfully connected to MySQL server!");
    }
});

module.exports = db_server;