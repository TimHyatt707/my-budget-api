const knex = require("./../knex");

class UserRepository {
  async create(credentials) {
    try {
      const [record] = await knex("users")
        .insert("credentials")
        .returning("*");
      return record;
    } catch (error) {
      return error;
    }
  }
  async getByEmail(email) {
    try {
      const [record] = await knex("users")
        .where("email", email)
        .returning("*");
      return record;
    } catch (error) {
      return error;
    }
  }
  async getById(id) {
    try {
      const [record] = await knex("users")
        .where("id", id)
        .returning("*");
      return record;
    } catch (error) {
      return error;
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
      return error;
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
      return error;
    }
  }
}

module.exports = UserRepository;
