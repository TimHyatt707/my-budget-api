const request = require("supertest");
const server = require("../server");

describe("GET /users/:userid", () => {
  it("should return 200 status code", () => {
    return request(server)
      .get("/users/:userid")
      .field("Authorization", "sometoken")
      .then(response => {
        console.log(response);
        expect(response.statusCode).toBe(200);
      });

    // (response.body.email, 'something@something.com', response.body.username, 'Regulator')
  });
});
