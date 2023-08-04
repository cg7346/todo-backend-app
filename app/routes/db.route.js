module.exports = (app) => {
  // contains all the routes for a given user
  const database = require("../controllers/db.controller.js");

  var router = require("express").Router();

  // Initializes the database
  router.get("/", database.createDatabase);

  // creates Task table in database
  router.get("/createTable", database.createTable);

  // for now this is used will update to hide this based on user authentication
  app.use("/database", router);
};
