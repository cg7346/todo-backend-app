'user strict';

const mysql = require('mysql');

//local mysql db connection
const db_server = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password'
});

db_server.connect((err) => {
    if (err) {
      console.log("Database Server Connection Failed !!!", err);
    } else {
      console.log("connected to MySQL Server");
    }
});

module.exports = db_server;