const CategoryRepository = require("./../repositories/CategoryRepository");
const categoryRepository = new CategoryRepository();
const jwt = require("jsonwebtoken");
const secret = require("./../env");

class CategoryService {
  async getByUserId(id, authentication) {
    try {
      const accessToken = jwt.verify(authentication.token, secret.JWT_KEY, {
        sub: id
      });
      if (accessToken.sub === id) {
        const categories = await categoryRepository.getByUser(id);
        return categories;
      } else throw "invalid signature";
    } catch (error) {
      return error;
    }
  }
  async createCategory(attributes, token) {
    try {
      const categoryObject = Object.assign({}, attributes);
      const category = await categoryRepository.create(categoryObject);
      return category;
    } catch (error) {
      return error;
    }
  }
  async update(id, changes, token) {
    try {
      const attributes = Object.assign({}, changes);
      const updatedCategory = await categoryRepository.update(id, attributes);
      return updatedCategory;
    } catch (error) {
      return error;
    }
  }
  async delete(id, token) {
    try {
      const deletedCategory = await categoryRepository.delete(id);
      return deletedCategory;
    } catch (error) {
      return error;
    }
  }
}

module.exports = CategoryService;
