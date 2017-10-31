const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("./../env");
const UserRepository = require("./../repositories/UserRepository");
const userRepository = new UserRepository();

class AuthenticationService {
  async authenticate(loginCredentials) {
    try {
      const credentials = Object.assign({}, loginCredentials);
      if (!credentials.email || !credentials.password) {
        throw "Invalid email/password";
      }
      //TO DO: VALIDATOR
      const user = await userRepository.getByEmail(credentials.email);
      if (!user.length) {
        throw "Invalid email";
      }
      const passwordCheck = await bcrypt.compare(
        credentials.password,
        user[0].hashed_password
      );
      if (!passwordCheck) {
        throw "Bad password";
      }
      const timeIssued = Math.floor(Date.now() / 1000);
      return jwt.sign(
        {
          iss: "mybudget",
          aud: "mybudget",
          iat: timeIssued,
          sub: user[0].id
        },
        secret.JWT_KEY
      );
    } catch (error) {
      return error;
    }
  }
}

module.exports = AuthenticationService;
