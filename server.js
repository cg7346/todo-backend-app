var fs = require("fs");
var handlebars = require("handlebars");
const express = require("express");
const bodyParser = require("body-parser");

var template = fs.readFileSync("./index.html", "utf8");
const database = require("./config/db");

// create express app
const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// define a root route
app.get("/", (req, res) => {
  var pageBuilder = handlebars.compile(template);
  var pageText = pageBuilder();
  res.writeHead(200, { "Context-Type": "text/html" });
  res.write(pageText);
  res.end();
});

// database configuration routes
require("./app/routes/db.route")(app);
require("./app/routes/todo.route")(app);

// setup server port
const PORT = process.env.PORT || 8000;

// set port, listen for requests
app.listen(PORT, () => {
  console.log(`Server is up and running on http://localhost:${PORT}`);
});
