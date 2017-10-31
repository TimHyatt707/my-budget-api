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
  async createCategory(id, attributes, authentication) {
    try {
      const accessToken = await jwt.verify(
        authentication.token,
        secret.JWT_KEY,
        { sub: id }
      );
      if (accessToken.sub === id) {
        const categoryObject = Object.assign({}, attributes);
        const category = await categoryRepository.create(categoryObject);
        return category;
      } else throw "invalid signature";
    } catch (error) {
      return error;
    }
  }
  async update(id, changes, authentication) {
    try {
      const accessToken = jwt.verify(authentication.token, secret.JWT_KEY, {
        sub: id
      });
      if (accessToken.sub === id) {
        const attributes = Object.assign({}, changes);
        const updatedCategory = await categoryRepository.update(id, attributes);
        return updatedCategory;
      } else throw "invalid signature";
    } catch (error) {
      return error;
    }
  }
  async delete(id, authentication) {
    try {
      const accessToken = jwt.verify(authentication.token, secret.JWT_KEY, {
        sub: id
      });
      if (accessToken.sub === id) {
        const deletedCategory = await categoryRepository.delete(id);
        return deletedCategory;
      } else throw "invalid signature";
    } catch (error) {
      return error;
    }
  }
}

module.exports = CategoryService;
