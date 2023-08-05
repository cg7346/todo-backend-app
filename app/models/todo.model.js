const sql = require("../../config/db");

// constructor
// constructor
const Todo = function (todo) {
  this.task = todo.task;
};

//create a todo in database
Todo.create = (newTodo, result) => {
  // console.log("Model: ", newTodo.task, newTodo);
  sql.query(
    'INSERT INTO Tasks (task) VALUES (?)',
    `${newTodo.task}`,
    (err, res) => {
      if (err) {
        console.log("ERROR creating todo: ", err);
        result(err, null);
        return;
      }

      console.log("created todo: ", { newTodo });
      result(null, { ...newTodo });
    }
  );
};

// get all the pending tasks
Todo.allTasks = (result) => {
  sql.query("SELECT * FROM Tasks WHERE status = 0", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("GET /");
    result(null, res);
  });
};

// get all the completed tasks
Todo.allCompleted = (result) => {
  sql.query("SELECT * FROM Tasks WHERE status = 1", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("GET /completed");
    result(null, res);
  });
};

// get all the deleted tasks
Todo.allDeleted = (result) => {
  sql.query("SELECT * FROM Tasks WHERE status = -1", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("GET /deleted");
    result(null, res);
  });
};

// update a task name and status --> status: -1 deleted, 0 pending, 1 completed
Todo.updateTodo = (id, task, status, result) => {
  sql.query(
    "UPDATE Tasks SET task = ?, status = ? WHERE id = ?",
    [task, status, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Nomination with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated task: ", {
        id: `${id}`,
        task: `${task}`,
        status: `${status}`,
      });
      result(null, { id: `${id}`, task: `${task}`, status: `${status}` });
    }
  );
};

// delete a task name by id
Todo.deleteTodo = (id, result) => {
  sql.query("DELETE FROM Tasks WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Nomination with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted task: ", {
      id: `${id}`,
    });
    result(null, { id: `${id}`});
  });
};

module.exports = Todo;
