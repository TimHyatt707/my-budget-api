const authenticationService = require("./../services/authenticationService");

class authenticationController {
  async login(req, res, next) {
    try {
      const token = await authenticationService.authenticate(req.body);
      res.json({ token });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = authenticationController;
