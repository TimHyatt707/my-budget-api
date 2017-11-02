const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("./../env");
class AuthenticationService {
  constructor({ UserRepository }) {
    this._userRepository = UserRepository;
    this.authenticate = this.authenticate.bind(this);
  }
  async authenticate(loginCredentials) {
    try {
      const credentials = Object.assign({}, loginCredentials);
      if (!credentials.email || !credentials.password) {
        throw "Invalid email/password";
      }
      const user = await this._userRepository.getByEmail(credentials.email);
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
      const userId = user[0].id;
      const timeIssued = Math.floor(Date.now() / 1000);
      const token = await jwt.sign(
        {
          iss: "mybudget",
          aud: "mybudget",
          iat: timeIssued,
          sub: user[0].id
        },
        secret.JWT_KEY
      );
      return { userId, token };
    } catch (error) {
      return error;
    }
  }
}

module.exports = AuthenticationService;
