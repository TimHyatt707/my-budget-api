"use strict";

process.env.NODE_ENV = "test";

const knex = require("../../knex");
const assert = require("chai").assert;
const { suite, test } = require("mocha");
const { addDatabaseHooks } = require("./utils/utils");
suite(
  "users_migrations",
  addDatabaseHooks(() => {
    test("User columns", done => {
      knex("User")
        .columnInfo()
        .then(actual => {
          const expected = {
            Id: {
              type: "integer",
              maxLength: null,
              nullable: false,
              defaultValue: "nextval('user_id_seq'::regclass)"
            },

            Username: {
              type: "text",
              maxLength: null,
              nullable: false,
              defaultValue: "''::character varying"
            },

            Password: {
              type: "character",
              maxLength: 60,
              nullable: false,
              defaultValue: "''::character"
            },

            CreatedAt: {
              type: "timestamp with time zone",
              maxLength: null,
              nullable: false,
              defaultValue: "now()"
            },

            UpdatedAt: {
              type: "timestamp with time zone",
              maxLength: null,
              nullable: false,
              defaultValue: "now()"
            }
          };

          for (const column in expected) {
            assert.deepEqual(
              actual[column],
              expected[column],
              `Column ${column} is not the same`
            );
          }

          done();
        })
        .catch(err => {
          done(err);
        });
    });
  })
);
