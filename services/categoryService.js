const jwt = require("jsonwebtoken");
const secret = require("./../env");

class CategoryService {
  constructor({ CategoryRepository, UserRepository }) {
    this._categoryRepository = CategoryRepository;
    this._userRepository = UserRepository;
    this.getByUserId = this.getByUserId.bind(this);
    this.createCategory = this.createCategory.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }
  async getByUserId(id, authentication) {
    try {
      const accessToken = jwt.verify(authentication, secret.JWT_KEY, {
        sub: id
      });
      if (accessToken.sub === id) {
        const categories = await this._categoryRepository.getByUser(id);
        return categories;
      } else throw "invalid signature";
    } catch (error) {
      return error;
    }
  }
  async createCategory(id, attributes, authentication) {
    try {
      const accessToken = await jwt.verify(authentication, secret.JWT_KEY, {
        sub: id
      });
      if (accessToken.sub === id) {
        const categoryObject = Object.assign({}, attributes);
        const category = await this._categoryRepository.create(categoryObject);
        return category;
      } else throw "invalid signature";
    } catch (error) {
      return error;
    }
  }
  async update(id, changes, authentication) {
    try {
      const accessToken = jwt.verify(authentication, secret.JWT_KEY, {
        sub: id
      });
      const user = await this._userRepository.getById(accessToken.sub);
      if (accessToken.sub === user.id) {
        const attributes = Object.assign({}, changes);
        const updatedCategory = await this._categoryRepository.update(
          id,
          attributes
        );
        return updatedCategory;
      } else throw "invalid signature";
    } catch (error) {
      return error;
    }
  }
  async delete(id, authentication) {
    try {
      const accessToken = jwt.verify(authentication, secret.JWT_KEY, {
        sub: id
      });
      const user = await this._userRepository.getById(accessToken.sub);
      if (accessToken.sub === user.id) {
        const deletedCategory = await this._categoryRepository.delete(id);
        return deletedCategory;
      } else throw "invalid signature";
    } catch (error) {
      return error;
    }
  }
}

module.exports = CategoryService;
