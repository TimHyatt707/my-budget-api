const bcrypt = require("bcryptjs");
const secret = require("./../env");
const jwt = require("jsonwebtoken");
const pick = require("lodash.pick");

class UserService {
  constructor({ UserRepository }) {
    this._userRepository = UserRepository;
    this.createUser = this.createUser.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }
  async createUser(attributes) {
    try {
      if (!attributes.username || !attributes.password || !attributes.email) {
        throw new Error("Bad Request");
      }
      const credentials = Object.assign({}, attributes);
      const hashedPassword = await bcrypt.hash(credentials.password, 12);
      delete credentials.password;
      credentials.hashed_password = hashedPassword;
      const user = await this._userRepository.create(credentials);
      return pick(user[0], ["id", "username", "email"]);
    } catch (error) {
      if (error.message === "users_email_unique")
        throw new Error("users_email_unique");
      else {
        throw new Error("Something went wrong");
      }
    }
  }
  async getUserById(authentication) {
    try {
      const accessToken = await jwt.verify(authentication, secret.JWT_KEY);
      if (!accessToken) {
        throw new Error("Bad token");
      }
      const user = await this._userRepository.getById(accessToken.sub);
      if (!user) {
        throw new Error("User not found");
      }
      return pick(user, ["id", "username", "email"]);
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateUser(id, changes, authentication) {
    try {
      if (isNaN(id)) {
        throw new Error("Bad Request");
      }
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
      } else throw new Error("Forbidden");
    } catch (error) {
      return error;
    }
  }
  async deleteUser(id, authentication) {
    try {
      if (isNaN(id)) {
        throw new Error("Bad Request");
      }
      const accessToken = jwt.verify(authentication, secret.JWT_KEY, {
        sub: id
      });
      if (accessToken.sub === id) {
        const deletedUser = await this._userRepository.delete(id);
        return pick(deletedUser, ["id", "username", "email"]);
      } else throw new Error("Forbidden");
    } catch (error) {
      return error;
    }
  }
}

module.exports = UserService;
