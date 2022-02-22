import request from "supertest";
import { app } from "../../app";

it("returns 201 on successful register", async () => {
  return request(app)
    .post("/api/users/register")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
});

it("returns 400 with invalid email", async () => {
  return request(app)
    .post("/api/users/register")
    .send({
      email: "asdf",
      password: "password",
    })
    .expect(400);
});

it("returns 400 with invalid password", async () => {
  return request(app)
    .post("/api/users/register")
    .send({
      email: "test@test.com",
      password: "p",
    })
    .expect(400);
});

it("returns 400 with empty email or password", async () => {
  await request(app)
    .post("/api/users/register")
    .send({
      email: "test@test.com",
    })
    .expect(400);

  await request(app)
    .post("/api/users/register")
    .send({
      password: "password",
    })
    .expect(400);
});

it("disallows duplicate emails", async () => {
  await request(app)
    .post("/api/users/register")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post("/api/users/register")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(400);
});

it("sets a cookie after successful regiser", async () => {
  const response = await request(app)
    .post("/api/users/register")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
