const categoryRepository = require("./../repositories/categoryRepository");

class categoryService {
  async getByUserId(id) {
    try {
      //TO DO: User authentication
      const categories = await categoryRepository.getByUser(id);
      return categories;
    } catch (error) {
      //TO DO: error handling
      error;
    }
  }
  async createCategory(attributes) {
    try {
      const attributes = Object.assign({}, attributes);
      const category = await categoryRepository.create(attributes);
      return category;
    } catch (error) {
      error;
    }
  }
  async update(id, changes) {
    try {
      const attributes = Object.assign({}, changes);
      const updatedCategory = await categoryRepository.update(attributes);
      return updatedCategory;
    } catch (error) {
      error;
    }
  }
  async delete(id) {
    try {
      const deletedCategory = await categoryRepository.delete(id);
      return deletedCategory;
    } catch (error) {
      error;
    }
  }
}

module.exports = categoryService;
