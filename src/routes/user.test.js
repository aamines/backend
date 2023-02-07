const supertest = required("supertest");
const app = required("../app.js");

let userId;

afterAll(() => {
  return supertest(app)
    .delete("/api/v1/users/delete")
    .send({ user_id: userId });
});

describe("POST /users/signup", () => {
  describe("when the request body is valid", () => {
    describe("When didn't use google", () => {
      test("Should create an account when email doesn't exist", async () => {
        const response = await supertest(app)
          .post("/api/v1/users/signup")
          .send({
            names: "test",
            email: "test@gmail.com",
            country: "test",
            password: "test@12345",
            usedGoogle: false,
          });

        userId = response.body.userId;
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
      });

      test("Should return an error when email already exists", async () => {
        const response = await supertest(app)
          .post("/api/v1/users/signup")
          .send({
            names: "test",
            email: "test@gmail.com",
            country: "test",
            password: "test@12345",
            usedGoogle: false,
          });
        expect(response.status).toBe(400);
        expect(response.body.token).toBeUndefined();
      });
    });

    describe("When used google", () => {});
  });

  describe("When the request body is invalid", () => {
    test("Should return an error when names is missing", async () => {
      const response = await supertest(app).post("/api/v1/users/signup").send({
        email: "test@gmail.com",
        country: "test",
        password: "test@12345",
        usedGoogle: false,
      });
      expect(response.status).toBe(400);
      expect(response.body.token).toBeUndefined();
    });

    test("Should return an error when email is missing", async () => {
      const response = await supertest(app).post("/api/v1/users/signup").send({
        names: "test",
        country: "test",
        password: "test@12345",
        usedGoogle: false,
      });
      expect(response.status).toBe(400);
      expect(response.body.token).toBeUndefined();
    });

    test("Should return an error when country is missing", async () => {
      const response = await supertest(app).post("/api/v1/users/signup").send({
        names: "test",
        email: "test@gmail.com",
        password: "test@12345",
        usedGoogle: false,
      });
      expect(response.status).toBe(400);
      expect(response.body.token).toBeUndefined();
    });

    test("Should return an error when password is missing", async () => {
      const response = await supertest(app).post("/api/v1/users/signup").send({
        names: "test",
        email: "test@gmail.com",
        country: "test",
        usedGoogle: false,
      });
      expect(response.status).toBe(400);
      expect(response.body.token).toBeUndefined();
    });

    test("Should return an error when usedGoogle is missing", async () => {
      const response = await supertest(app).post("/api/v1/users/signup").send({
        names: "test",
        email: "test@gmail.com",
        country: "test",
        password: "test@12345",
      });
      expect(response.status).toBe(400);
      expect(response.body.token).toBeUndefined();
    });
  });
});

describe("POST /users/login", () => {
  describe("when the request body is valid", () => {
    describe("When didn't use google", () => {
      test("Should login when email exists", async () => {
        const response = await supertest(app).post("/api/v1/users/login").send({
          email: "test@gmail.com",
          password: "test@12345",
          usedGoogle: false,
        });
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
      });

      test("Should return an error when email doesn't exist", async () => {
        const response = await supertest(app).post("/api/v1/users/login").send({
          email: "saad@gmail.com",
          password: "test@12345",
          usedGoogle: false,
        });
        expect(response.status).toBe(400);
        expect(response.body.token).toBeUndefined();
      });

      test("Should return an error when password is incorrect", async () => {
        const response = await supertest(app).post("/api/v1/users/login").send({
          email: "test@gmail.com",
          password: "test@123456",
          usedGoogle: false,
        });
        expect(response.status).toBe(400);
        expect(response.body.token).toBeUndefined();
      });
    });
  });

  describe("When the request body is invalid", () => {
    test("Should return an error when email is missing", async () => {
      const response = await supertest(app).post("/api/v1/users/login").send({
        password: "test@12345",
        usedGoogle: false,
      });

      expect(response.status).toBe(400);
      expect(response.body.token).toBeUndefined();
    });

    test("Should return an error when password is missing", async () => {
      const response = await supertest(app).post("/api/v1/users/login").send({
        email: "test@gmail.com",
        usedGoogle: false,
      });
      expect(response.status).toBe(400);
      expect(response.body.token).toBeUndefined();
    });
  });
});
