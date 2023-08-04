const request = require("supertest");
const baseURL = "http://localhost:8000";

// Test database creation
describe("GET /database", () => {
  it("should return 200", async () => {
    const response = await request(baseURL).get("/database");
    expect(response.statusCode).toBe(200);
  });
  it("should return database creation message", async () => {
    const response = await request(baseURL).get("/database");
    expect(response.body.message == "Database created successfully!").toBe(
      true
    );
  });
});

// Test creation of table within database
describe("GET /database/createTable", () => {
  beforeAll(async () => {
    // set up the database
    await request(baseURL).get("/database");
  });

  it("should return 200", async () => {
    const response = await request(baseURL).get("/database/createTable");
    expect(response.statusCode).toBe(200);
  });
  it("should return table creation message", async () => {
    const response = await request(baseURL).get("/database/createTable");
    expect(
      response.body.message == "Database table created successfully!"
    ).toBe(true);
  });
});
