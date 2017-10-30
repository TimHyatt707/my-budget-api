const CategoryRepository = require("./../repositories/CategoryRepository");
const categoryRepository = new CategoryRepository();

class CategoryService {
  async getByUserId(id) {
    try {
      //TO DO: User authentication
      const categories = await categoryRepository.getByUser(id);
      return categories;
    } catch (error) {
      //TO DO: error handling
      return error;
    }
  }
  async createCategory(attributes) {
    try {
      const categoryObject = Object.assign({}, attributes);
      const category = await categoryRepository.create(categoryObject);
      return category;
    } catch (error) {
      return error;
    }
  }
  async update(id, changes) {
    try {
      const attributes = Object.assign({}, changes);
      const updatedCategory = await categoryRepository.update(attributes);
      return updatedCategory;
    } catch (error) {
      return error;
    }
  }
  async delete(id) {
    try {
      const deletedCategory = await categoryRepository.delete(id);
      return deletedCategory;
    } catch (error) {
      return error;
    }
  }
}

module.exports = CategoryService;
