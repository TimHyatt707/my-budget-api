const request = require("supertest");
const server = require("../server");

describe("POST A USER /users", () => {
  it("should return 400 status code if bad request", done => {
    return request(server)
      .post("/users")
      .then(response => {
        expect(response.statusCode).toBe(400);
        done();
      });
  });
  it("should return 200 status code", done => {
    let user = {
      email: "email@emailworld.com",
      username: "something",
      password: "pass"
    };
    return request(server)
      .post("/users")
      .set("Content-Type", "application/json")
      .send(user)
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
