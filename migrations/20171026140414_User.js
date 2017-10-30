exports.up = function(knex) {
  return knex.schema.createTable("users", t => {
    t.increments("id");
    t.string("username").notNullable();
    t.string("hashed_password", 60).notNullable();
    t
      .string("email")
      .unique()
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
