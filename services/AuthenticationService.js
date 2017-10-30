const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("./../env");
const UserRepository = require("./../repositories/UserRepository");
const userRepository = new UserRepository();

class AuthenticationService {
  async authenticate(credentials) {
    try {
      const credentials = Object.assign({}, credentials);
      if (!credentials.username || !credentials.password) {
        throw "Invalid username/password";
      }
      //TO DO: VALIDATOR
      const user = await userRepository.getByEmail(credentials.email);
      if (!user) {
        throw "User not found";
      }
      const passwordCheck = await bcrypt.compare(
        credentials.password,
        user.hashed_password
      );
      if (!passwordCheck) {
        throw "Wrong password";
      }
      const timeIssued = Math.floor(Date.now() / 1000);
      return jwt.sign(
        {
          iss: "mybudget",
          aud: "mybudget",
          iat: timeIssued,
          sub: user.id
        },
        secret.JWT_KEY
      );
    } catch (error) {
      return error;
    }
  }
}

module.exports = AuthenticationService;
