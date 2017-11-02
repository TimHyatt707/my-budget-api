class CategoryRepository {
  constructor({ db }) {
    this._db = db;
  }
  async getByName(name) {
    try {
      const record = await this._db("categories")
        .where("name", name)
        .returning("*");
      return record;
    } catch (error) {
      return error;
    }
  }
  async getById(id) {
    try {
      const record = await this._db("categories")
        .where("id", id)
        .returning("*");
      return record;
    } catch (error) {
      return error;
    }
  }
  async getByUser(id) {
    try {
      const records = await this._db("categories")
        .where("user_id", id)
        .returning("*");
      return records;
    } catch (error) {
      return error;
    }
  }
  async create(attributes) {
    try {
      const [record] = await this._db("categories")
        .insert(attributes)
        .returning("*");
      return record;
    } catch (error) {
      return error;
    }
  }
  async update(id, changes) {
    try {
      const [record] = await this._db("categories")
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
      const [record] = await this._db("categories")
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
