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
      switch (authentication) {
        case !authentication:
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
          res.json({ authentication });
          break;
      }
    } catch (error) {
      return error;
    }
  }
}
module.exports = AuthenticationController;
