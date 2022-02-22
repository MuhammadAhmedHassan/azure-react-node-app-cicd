import request from "supertest";
import { app } from "../../app";

it("clears the cookie after logout", async () => {
  await request(app)
    .post("/api/users/register")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/logout")
    .send({})
    .expect(200);

  const isIncluded = response
    .get("Set-Cookie")[0]
    .includes("01 Jan 1970 00:00:00 GMT;");

  expect(isIncluded).toBeTruthy();
});
