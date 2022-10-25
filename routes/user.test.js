import supertest from "supertest";
import app from "../index.js";

describe("POST /users/signup", () => {
  describe("when the request body is valid", () => {
    test("should return 201", async () => {
      const response = await supertest(app).post("/api/v1/users/signup").send({
        name: "test",
        email: "",
        password: "test",
      });
      expect(response.status).toBe(201);
    });
  });
});
