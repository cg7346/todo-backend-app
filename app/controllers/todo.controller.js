const Todo = require("../models/todo.model.js");

// create and save a new todo
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // create a todo (Constructor)
  const todo = new Todo({
    task: req.body.task,
  });

  // save todo in the database
  //   console.log("TESTING: ", todo);
  Todo.create(todo, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating a task.",
      });
    else res.status(200).send(data);
  });
};

// retrieve all tasks that are pending from the database
exports.tasks = (req, res) => {
  Todo.allTasks((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while getting tasks.",
      });
    else res.status(200).send(data);
  });
};

// retrieve all tasks completed from the database
exports.completed = (req, res) => {
  Todo.allCompleted((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving completed tasks.",
      });
    else res.status(200).send(data);
  });
};

// retrieve all tasks deleted from the database
exports.deleted = (req, res) => {
  Todo.allDeleted((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving deleted tasks.",
      });
    else res.status(200).send(data);
  });
};

exports.update = (req, res) => {
  // console.log(`${req.body.status}`);
  // console.log(parseInt(req.params.id));
  Todo.updateTodo(
    parseInt(`${req.params.id}`),
    `${req.body.task}`,
    parseInt(`${req.body.status}`),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Todo not found with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: `Error updating Todo with id ${req.params.id}`,
          });
        }
      } else res.status(200).send(data);
    }
  );
};

exports.delete = (req, res) => {
    Todo.deleteTodo(
      parseInt(`${req.params.id}`),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Todo not found with id ${req.params.id}.`,
            });
          } else {
            res.status(500).send({
              message: `Error updating Todo with id ${req.params.id}`,
            });
          }
        } else res.status(200).send(data);
      }
    );
  };

