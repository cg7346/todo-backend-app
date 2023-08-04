const Database = require("../models/db.model.js");

// Create the database instance
exports.createDatabase = (req, res) => {
  Database.createDatabase((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating database.",
      });
    else
      res.send({
        message: "Database created successfully!",
      });
  });
};

// create a table in the database
exports.createTable = (req, res) => {
  Database.createTable((err, table) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating table.",
      });
    else
      res.send({
        message: "Database table created successfully!",
      });
  });
};
