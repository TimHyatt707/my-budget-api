const knex = require("./../knex");

class CategoryRepository {
  async getByName(name) {
    try {
      const record = await knex("categories")
        .where("name", name)
        .returning("*");
      return record;
    } catch (error) {
      return error;
    }
  }
  async getById(id) {
    try {
      const record = await knex("categories")
        .where("id", id)
        .returning("*");
      return record;
    } catch (error) {
      return error;
    }
  }
  async getByUser(id) {
    try {
      const records = await knex("categories")
        .where("user_id", id)
        .returning("*");
      return records;
    } catch (error) {
      return error;
    }
  }
  async create(attributes) {
    try {
      const [record] = await knex("categories")
        .insert(attributes)
        .returning("*");
      return record;
    } catch (error) {
      return error;
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
      return error;
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
      return error;
    }
  }
}

module.exports = CategoryRepository;
