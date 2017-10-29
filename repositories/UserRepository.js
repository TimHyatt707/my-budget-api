const knex = require("./../knex");

class UserRepository {
  async create(credentials) {
    try {
      const [record] = await knex("users")
        .insert("credentials")
        .returning("*");
      return record;
    } catch (error) {
      error;
    }
  }
  async getById(id) {
    try {
      const [record] = await knex("users")
        .where("id", id)
        .returning("*");
      return record;
    } catch (error) {
      error;
    }
  }
  async update(id, changes) {
    try {
      const [record] = await knex("users")
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
      const [record] = await knex("users")
        .del()
        .where("id", id)
        .returning("*");
      return record;
    } catch (error) {
      error;
    }
  }
}

module.exports = UserRepository;
