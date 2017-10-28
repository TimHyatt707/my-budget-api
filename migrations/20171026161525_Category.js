exports.up = function(knex) {
  return knex.schema.createTable("categories", t => {
    t.increments("id");
    t
      .integer("user_id")
      .references("id")
      .inTable("users")
      .notNullable()
      .onDelete("CASCADE");
    t.string("name").notNullable();
    t.integer("limit").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("categories");
};
