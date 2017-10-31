const AuthenticationService = require("./../services/AuthenticationService");
const authenticationService = new AuthenticationService();

class AuthenticationController {
  async login(req, res, next) {
    try {
      const token = await authenticationService.authenticate(req.body);
      switch (token) {
        case !token:
          res.status(500).json({ message: "Something went wrong" });
          break;
        case "Invalid email/password":
          res.status(400).json({ message: "Bad email/password" });
          break;
        case "Invalid email":
          res.status(400).json({ message: "Invalid email" });
          break;
        case "Bad password":
          res.status(400).json({ message: "Bad password" });
          break;
        default:
          res.json({ token });
          break;
      }
    } catch (error) {
      return error;
    }
  }
}
module.exports = AuthenticationController;
