const bcrypt = require("bcrypt");
const userRepository = require("./../repositories/userRepository");
const omit = require("lodash.omit");
const pick = require("lodash.pick");

class userService {
  async createUser(attributes) {
    try {
      const credentials = Object.assign({}, attributes);
      //TO DO : VALIDATION
      const hashedPassword = await bcrypt.hash(credentials.password, 12);
      delete attributes.password;
      credentials.hashedPassword = hashedPassword;
      const user = await userRepository.create(credentials);
      return omit(user.hashedPassword);
    } catch (error) {
      //TO DO: ERROR HANDLING WITH VALIDATOR
      error;
    }
  }
  async getUserById(id) {
    try {
      //TO DO: AUTHENTICATION
      const user = await userRepository.getByID(id);
      return pick(user, ["id", "username", "email"]);
    } catch (error) {
      error;
    }
  }
  async updateUser(id, changes) {
    try {
      //TO DO: AUTHENTICATION
      const attributes = Object.assign({}, changes);
      const updatedUser = await userRepository.update(id, attributes);
      return pick(updatedUser, ["id", "username", "email"]);
    } catch (error) {
      error;
    }
  }
  async deleteUser(id) {
    try {
      const deletedUser = await userRepository.delete(id);
      return pick(deletedUser, ["id", "username", "email"]);
    } catch (error) {
      error;
    }
  }
}

module.exports = userService;
