const bcrypt = require("bcryptjs");
const secret = require("./../env");
const jwt = require("jsonwebtoken");
const pick = require("lodash.pick");

class UserService {
  constructor({ userRepository }) {
    this._userRepository = userRepository;
    this.createUser = this.createUser.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }
  async createUser(attributes) {
    try {
      const credentials = Object.assign({}, attributes);
      const hashedPassword = await bcrypt.hash(credentials.password, 12);
      delete credentials.password;
      credentials.hashed_password = hashedPassword;
      const user = await this._userRepository.create(credentials);
      return pick(user[0], ["id", "username", "email"]);
    } catch (error) {
      return error;
    }
  }
  async getUserById(id, authentication) {
    try {
      const accessToken = await jwt.verify(authentication, secret.JWT_KEY, {
        sub: id
      });
      if (accessToken.sub === id) {
        const user = await this._userRepository.getById(id);
        return pick(user, ["id", "username", "email"]);
      } else throw "invalid signature";
    } catch (error) {
      return error;
    }
  }
  async updateUser(id, changes, authentication) {
    try {
      const accessToken = jwt.verify(authentication, secret.JWT_KEY, {
        sub: id
      });
      if (accessToken.sub === id) {
        const changesObject = Object.assign({}, changes);
        const updatedUser = await this._userRepository.update(
          id,
          changesObject
        );
        return pick(updatedUser, ["id", "username", "email"]);
      } else throw "invalid signature";
    } catch (error) {
      return error;
    }
  }
  async deleteUser(id, authentication) {
    try {
      const accessToken = jwt.verify(authentication, secret.JWT_KEY, {
        sub: id
      });
      if (accessToken.sub === id) {
        const deletedUser = await this._userRepository.delete(id);
        return pick(deletedUser, ["id", "username", "email"]);
      } else throw "invalid signature";
    } catch (error) {
      return error;
    }
  }
}

module.exports = UserService;
