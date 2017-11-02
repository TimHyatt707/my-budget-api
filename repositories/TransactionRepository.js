class TransactionRepository {
  constructor({ db }) {
    this._db = db;
  }
  async getByUser(id) {
    try {
      const records = await this._db("transactions")
        .where("user_id", id)
        .returning("*");
      return records;
    } catch (error) {
      return error;
    }
  }
  async create(attributes) {
    try {
      const [record] = await this._db("transactions")
        .insert(attributes)
        .returning("*");
      return record;
    } catch (error) {
      return error;
    }
  }
  async update(id, changes) {
    try {
      const [record] = await this._db("transactions")
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
      const [record] = await this._db("transactions")
        .del()
        .where("id", id)
        .returning("*");
      return record;
    } catch (error) {
      return error;
    }
  }
}

module.exports = TransactionRepository;
