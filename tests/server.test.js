"use strict";

process.env.NODE_ENV = "test";

const request = require("supertest");
const server = require("../server");
const { suite, test } = require("mocha");
const { addDatabaseHooks } = require("./utils");

suite(
  "POST A USER /users",
  addDatabaseHooks(() => {
    test("should return 400 status code if bad request", done => {
      request(server)
        .post("/users")
        .expect(response => 400)
        .end(done);
    });
    test("should return 200 status code", done => {
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
          expect(response.statusCode)
            .toBe(200)
            .end(done);
        });
    });
  })
);
