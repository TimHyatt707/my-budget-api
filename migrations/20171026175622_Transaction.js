exports.up = function(knex, Promise) {
  return knex.schema.createTable("Transaction", t => {
    t.increments("Id");
    t
      .integer("UserId")
      .references("Id")
      .inTable("User")
      .notNullable()
      .onDelete("CASCADE");
    t
      .integer("CategoryId")
      .references("Id")
      .inTable("Category")
      .notNullable()
      .onDelete("CASCADE");
    t.string("Name").notNullable();
    t.decimal("Amount", 2).notNullable();
    t.timestamp("CreatedAt").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("Transaction");
};
