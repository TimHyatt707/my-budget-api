const bcrypt = require("bcryptjs");
const UserRepository = require("./../repositories/UserRepository");
const omit = require("lodash.omit");
const pick = require("lodash.pick");

class UserService {
  async createUser(attributes) {
    try {
      const credentials = Object.assign({}, attributes);
      //TO DO : VALIDATION
      const hashedPassword = await bcrypt.hash(credentials.password, 12);
      delete attributes.password;
      credentials.hashedPassword = hashedPassword;
      const user = await UserRepository.create(credentials);
      return omit(user.hashedPassword);
    } catch (error) {
      //TO DO: ERROR HANDLING WITH VALIDATOR
      error;
    }
  }
  async getUserById(id) {
    try {
      //TO DO: AUTHENTICATION
      const user = await UserRepository.getByID(id);
      return pick(user, ["id", "username", "email"]);
    } catch (error) {
      error;
    }
  }
  async updateUser(id, changes) {
    try {
      //TO DO: AUTHENTICATION
      const changes = Object.assign({}, changes);
      const updatedUser = await UserRepository.update(id, changes);
      return pick(updatedUser, ["id", "username", "email"]);
    } catch (error) {
      error;
    }
  }
  async deleteUser(id) {
    try {
      const deletedUser = await UserRepository.delete(id);
      return pick(deletedUser, ["id", "username", "email"]);
    } catch (error) {
      error;
    }
  }
}

module.exports = UserService;
