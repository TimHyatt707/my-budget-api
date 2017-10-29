const knex = require("./../knex");

class CategoryRepository {
  async getByUser(id) {
    try {
      const records = await knex("categories")
        .where("user_id", id)
        .returning("*");
      return records;
    } catch (error) {
      error;
    }
  }
  async create(attributes) {
    try {
      const [record] = await knex("categories")
        .insert(attributes)
        .returning("*");
      return record;
    } catch (error) {
      error;
    }
  }
  async update(id, changes) {
    try {
      const [record] = await knex("categories")
        .update(changes)
        .where("id", id)
        .returning("*");
      return record;
    } catch (error) {
      error;
    }
  }
  async delete(id) {
    try {
      const [record] = await knex("categories")
        .del()
        .where("id", id)
        .returning("*");
      return record;
    } catch (error) {
      error;
    }
  }
}

module.exports = CategoryRepository;
