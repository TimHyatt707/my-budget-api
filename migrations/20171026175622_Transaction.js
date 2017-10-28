exports.up = function(knex) {
  return knex.schema.createTable("transactions", t => {
    t.increments("id");
    t
      .integer("user_id")
      .references("id")
      .inTable("user")
      .notNullable()
      .onDelete("CASCADE");
    t
      .integer("category_id")
      .references("id")
      .inTable("categories")
      .notNullable()
      .onDelete("CASCADE");
    t.string("name").notNullable();
    t.decimal("amount", 2).notNullable();
    t.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("transactions");
};
