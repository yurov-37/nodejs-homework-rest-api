const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const { User } = require("../models");
require("dotenv").config();
const { DB_HOST } = process.env;
mongoose.set("strictQuery", false);

const testUserData = {
  email: "test@example.com",
  password: "password",
};

describe("testing of login controller", () => {
  beforeAll(async () => {
    await mongoose.connect(DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  it("should create user", async () => {
    const response = await request(app)
      .post("/api/users/signup")
      .send(testUserData);
    expect(response.statusCode).toBe(201);
  });

  it("should return status code 200 and etc", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send(testUserData);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(typeof response.body.user).toBe("object");
    expect(typeof response.body.user.email).toBe("string");
    expect(typeof response.body.user.subscription).toBe("string");
  });

  it("should return a 401 error if email or password is incorrect", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({ email: "test@example.com", password: "wrongpassword" });

    expect(response.status).toBe(401);
  });

  afterAll(async () => {
    await User.deleteOne({ email: testUserData.email });
    await mongoose.connection.close();
  });
});
