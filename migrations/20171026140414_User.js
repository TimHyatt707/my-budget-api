exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("User", t => {
      t.increments("Id");
      t.string("Username").notNullable();
      t.string("Password", 60).notNullable();
      t
        .string("Email")
        .unique()
        .notNullable();
    })
    .then(() => {});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("User");
};
