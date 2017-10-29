const knex = require("./../knex");

class TransactionRepository {
  async getByUser(id) {
    try {
      const records = await knex("transactions")
        .where("user_id", id)
        .returning("*");
      return records;
    } catch (error) {
      error;
    }
  }
  async create(attributes) {
    try {
      const [record] = await knex("transactions")
        .insert(attributes)
        .returning("*");
      return record;
    } catch (error) {
      error;
    }
  }
  async update(id, changes) {
    try {
      const [record] = await knex("transactions")
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
      const [record] = await knex("transactions")
        .del()
        .where("id", id)
        .returning("*");
      return record;
    } catch (error) {
      error;
    }
  }
}

module.exports = TransactionRepository;
