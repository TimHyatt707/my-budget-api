exports.up = function(knex, Promise) {
  return knex.schema.createTable("Category", t => {
    t.increments("Id");
    t
      .integer("UserId")
      .references("Id")
      .inTable("User")
      .notNullable()
      .onDelete("CASCADE");
    t.string("Name").notNullable();
    t.integer("Limit").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("Category");
};
