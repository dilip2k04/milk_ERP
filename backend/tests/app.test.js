const request = require("supertest");
const app = require("../app");

describe("Milk ERP Backend", () => {
  test("GET / should return API running message", async () => {
    const res = await request(app).get("/");

    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Milk ERP API running");
  });
});
