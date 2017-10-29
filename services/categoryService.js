const CategoryRepository = require("./../repositories/CategoryRepository");

class CategoryService {
  async getByUserId(id) {
    try {
      //TO DO: User authentication
      const categories = await CategoryRepository.getByUser(id);
      return categories;
    } catch (error) {
      //TO DO: error handling
      error;
    }
  }
  async createCategory(attributes) {
    try {
      const attributes = Object.assign({}, attributes);
      const category = await CategoryRepository.create(attributes);
      return category;
    } catch (error) {
      error;
    }
  }
  async update(id, changes) {
    try {
      const attributes = Object.assign({}, changes);
      const updatedCategory = await CategoryRepository.update(attributes);
      return updatedCategory;
    } catch (error) {
      error;
    }
  }
  async delete(id) {
    try {
      const deletedCategory = await CategoryRepository.delete(id);
      return deletedCategory;
    } catch (error) {
      error;
    }
  }
}

module.exports = CategoryService;
