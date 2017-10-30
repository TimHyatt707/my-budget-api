const bcrypt = require("bcryptjs");
const UserRepository = require("./../repositories/UserRepository");
const userRepository = new UserRepository();
const pick = require("lodash.pick");

class UserService {
  async createUser(attributes) {
    try {
      const credentials = Object.assign({}, attributes);
      //TO DO : VALIDATION
      const hashedPassword = await bcrypt.hash(credentials.password, 12);
      delete credentials.password;
      credentials.hashed_password = hashedPassword;
      const user = await userRepository.create(credentials);
      return pick(user[0], ["id", "username", "email"]);
    } catch (error) {
      //TO DO: ERROR HANDLING WITH VALIDATOR
      return error;
    }
  }
  async getUserById(id) {
    try {
      //TO DO: AUTHENTICATION
      const user = await userRepository.getById(id);
      return pick(user, ["id", "username", "email"]);
    } catch (error) {
      return error;
    }
  }
  async updateUser(id, changes) {
    try {
      //TO DO: AUTHENTICATION
      const changesObject = Object.assign({}, changes);
      const updatedUser = await userRepository.update(id, changesObject);
      return pick(updatedUser, ["id", "username", "email"]);
    } catch (error) {
      return error;
    }
  }
  async deleteUser(id) {
    try {
      const deletedUser = await userRepository.delete(id);
      return pick(deletedUser, ["id", "username", "email"]);
    } catch (error) {
      return error;
    }
  }
}

module.exports = UserService;
