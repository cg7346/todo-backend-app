const sql = require("../../config/db");

// constructor
const Database = function () {};

// create the database
Database.createDatabase = (result) => {
  let databaseName = "todolist";

  let dropQuery = `DROP DATABASE IF EXISTS ${databaseName};`;
  let createDatabase = `CREATE DATABASE ${databaseName};`;
  let useQuery = `USE ${databaseName};`;

  sql.query(dropQuery, (err, res) => {
    if (err) {
      console.log("ERROR upon checking if database exists: ", err);
      result(null, err);
      return;
    }
    console.log(`Checked if database ${databaseName} exists.`);

    sql.query(createDatabase, (error, res) => {
      if (error) {
        console.log("ERROR upon creating database: ", error);
        result(null, error);
        return;
      }

      console.log(`Successfully created ${databaseName} database!`);

      sql.query(useQuery, (er, res) => {
        if (error) {
          console.log("ERROR upon creating database: ", error);
          result(null, error);
          return;
        }

        console.log(`Successfully using database ${databaseName}!`);
        result(null, res);
      });
    });
  });
};

// check if table exists in database and create a table in the database for the tasks
Database.createTable = (result) => {
  let tableName = "Tasks";

  let dropTableQuery = `DROP TABLE IF EXISTS ${tableName}`;
  let createTableQuery = `
        CREATE TABLE ${tableName} (
            ID SERIAL PRIMARY KEY NOT NULL,
            task VARCHAR(150) NOT NULL,
            status SMALLINT DEFAULT 0
        );
    `;

  sql.query(dropTableQuery, (err, res) => {
    if (err) {
      console.log("ERROR upon checking if table exists: ", err);
      result(null, err);
      return;
    }
    console.log(`Database table ${tableName} dropped.`);

    sql.query(createTableQuery, (error, res) => {
      if (error) {
        console.log("ERROR upon creating table: ", error);
        result(null, error);
        return;
      }

      console.log(`Successfully created ${tableName} table in database!`);
      result(null, res);
    });
  });
};

module.exports = Database;
