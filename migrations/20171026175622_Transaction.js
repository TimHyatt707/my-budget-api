exports.up = function(knex) {
  return knex.schema.createTable("transactions", t => {
    t.increments("id");
    t
      .integer("user_id")
      .references("id")
      .inTable("users")
      .notNullable()
      .onDelete("CASCADE");
    t
      .integer("category_id")
      .references("id")
      .inTable("categories")
      .notNullable()
      .onDelete("CASCADE");
    t.string("name").notNullable();
    t.decimal("amount").notNullable();
    t.string("created_at").defaultTo("");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("transactions");
};
