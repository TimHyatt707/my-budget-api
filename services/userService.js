const bcrypt = require("bcryptjs");
const secret = require("./../env");
const jwt = require("jsonwebtoken");
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
  async getUserById(id, authentication) {
    try {
      const accessToken = await jwt.verify(
        authentication.token,
        secret.JWT_KEY
      );
      if (accessToken.sub === id) {
        const user = await userRepository.getById(id);
        return pick(user, ["id", "username", "email"]);
      } else throw "invalid signature";
    } catch (error) {
      return error;
    }
  }
  async updateUser(id, changes, token) {
    try {
      //TO DO: AUTHENTICATION
      const changesObject = Object.assign({}, changes);
      const updatedUser = await userRepository.update(id, changesObject);
      return pick(updatedUser, ["id", "username", "email"]);
    } catch (error) {
      return error;
    }
  }
  async deleteUser(id, token) {
    try {
      const deletedUser = await userRepository.delete(id);
      return pick(deletedUser, ["id", "username", "email"]);
    } catch (error) {
      return error;
    }
  }
}

module.exports = UserService;
