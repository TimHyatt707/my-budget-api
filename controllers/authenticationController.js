class AuthenticationController {
  constructor({ AuthenticationService }) {
    this._authenticationService = AuthenticationService;
    this.login = this.login.bind(this);
  }
  async login(req, res, next) {
    try {
      const authentication = await this._authenticationService.authenticate(
        req.body
      );
      res.json({ authentication });
    } catch (error) {
      switch (error.message) {
        case "Invalid email/password":
          res.sendStatus(400);
          break;
        default:
          res.sendStatus(500);
          break;
      }
    }
  }
}
module.exports = AuthenticationController;
