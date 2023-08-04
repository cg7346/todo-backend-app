const request = require("supertest");
const baseURL = "http://localhost:8000";

// Test getting all todo tasks
describe("GET /todo", () => {
  const newTodo = {
    task: "Drink water",
  };
  beforeAll(async () => {
    // setup database connection
    await request(baseURL).get("/database");
    // setup table in database
    await request(baseURL).get("/database/createTable");
    // create a todo task
    await request(baseURL).post("/todo").send(newTodo);
  });
  afterAll(async () => {
    await request(baseURL).delete(`/todo/1`);
  });
  it("should return 200", async () => {
    const response = await request(baseURL).get("/todo");
    expect(response.statusCode).toBe(200);
  });
  it("should return todos", async () => {
    const response = await request(baseURL).get("/todo");
    expect(response.body.length >= 1).toBe(true);
  });
});

// Test adding a todo to the list
describe("POST /todo", () => {
  const newTodo = {
    task: "Drink water",
  };
  beforeAll(async () => {
    // setup database connection
    await request(baseURL).get("/database");
    // setup table in database
    await request(baseURL).get("/database/createTable");
  });
  it("should add an item to todo list", async () => {
    const response = await request(baseURL).post("/todo").send(newTodo);
    expect(response.statusCode).toBe(200);
    expect(response.body.task).toBe(newTodo.task);
  });
});

// Test updating a todo task
describe("PATCH /todo/:id", () => {
  const todo = {
    task: "Drink water",
  };

  const newTodo = {
    task: "Drink milk",
    status: 1,
  };

  beforeAll(async () => {
    // setup database connection
    await request(baseURL).get("/database");
    // setup table in database
    await request(baseURL).get("/database/createTable");
    // create a todo task
    await request(baseURL).post("/todo").send(todo);
  });
  afterAll(async () => {
    await request(baseURL).delete(`/todo/1`);
  });
  it("should return 200", async () => {
    const response = await request(baseURL).patch("/todo/1").send(newTodo);
    expect(response.statusCode).toBe(200);
  });
  it("should return todo's", async () => {
    const response = await request(baseURL).patch("/todo/1").send(newTodo);
    expect(response.body.task).toBe(`${newTodo.task}`);
    expect(response.body.status).toBe(`${newTodo.status}`);
  });
});


// Test deleting a todo task
describe("DELETE /todo/:id", () => {
  const todo = {
    task: "Drink water",
  };

  beforeAll(async () => {
    // setup database connection
    await request(baseURL).get("/database");
    // setup table in database
    await request(baseURL).get("/database/createTable");
    // create a todo task
    await request(baseURL).post("/todo").send(todo);
  });
  afterAll(async () => {
    await request(baseURL).delete(`/todo/1`);
  });
  it("should return todo's", async () => {
    const response = await request(baseURL).delete("/todo/1");
    expect(response.body.id).toBe("1");
  });
});

// Test getting all todo tasks that have been completed
describe("GET /todo", () => {
  const todo = {
    task: "Drink water",
  };

  const newTodo = {
    task: "Drink water",
    status: 1
  };
  beforeAll(async () => {
    // setup database connection
    await request(baseURL).get("/database");
    // setup table in database
    await request(baseURL).get("/database/createTable");
    // create a todo task
    await request(baseURL).post("/todo").send(todo);
    // mark todo as completed
    await request(baseURL).patch("/todo/1").send(newTodo);
  });
  afterAll(async () => {
    await request(baseURL).delete(`/todo/1`);
  });
  it("should return 200", async () => {
    const response = await request(baseURL).get("/todo/completed");
    expect(response.statusCode).toBe(200);
  });
  it("should return todos", async () => {
    const response = await request(baseURL).get("/todo/completed");
    expect(response.body.length >= 1).toBe(true);
  });
});

// Test getting all todo tasks that have been deleted
describe("GET /todo", () => {
  const todo = {
    task: "Drink water",
  };

  const newTodo = {
    task: "Drink water",
    status: -1
  };
  beforeAll(async () => {
    // setup database connection
    await request(baseURL).get("/database");
    // setup table in database
    await request(baseURL).get("/database/createTable");
    // create a todo task
    await request(baseURL).post("/todo").send(todo);
    // mark todo as deleted
    await request(baseURL).patch("/todo/1").send(newTodo);
  });
  afterAll(async () => {
    await request(baseURL).delete(`/todo/1`);
  });
  it("should return 200", async () => {
    const response = await request(baseURL).get("/todo/deleted");
    expect(response.statusCode).toBe(200);
  });
  it("should return todos", async () => {
    const response = await request(baseURL).get("/todo/deleted");
    expect(response.body.length >= 1).toBe(true);
  });
});
