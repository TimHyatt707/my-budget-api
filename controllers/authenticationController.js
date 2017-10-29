const AuthenticationService = require("./../services/AuthenticationService");

class AuthenticationController {
  async login(req, res, next) {
    try {
      const token = await AuthenticationService.authenticate(req.body);
      res.json({ token });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = AuthenticationController;
