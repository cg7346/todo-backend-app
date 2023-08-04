module.exports = (app) => {
  var router = require("express").Router();

  // contains all the routes for a given user
  const todo = require("../controllers/todo.controller.js");

  // create a new todo
  router.post("/create", todo.create);

  // all the pending todo's
  router.get("/", todo.tasks);

  // all completed todo's
  router.get("/completed", todo.completed);

  // all deleted todo's
  router.get("/deleted", todo.deleted);

  // update todo
  router.patch("/:id", todo.update);

  // for now this is used will update to hide this based on user authentication
  app.use("/todo", router);
};
