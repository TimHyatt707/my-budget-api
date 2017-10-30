const express = require("express");
const Boom = require("boom");
const router = express.Router();
const AuthenticationController = require("./../controllers/AuthenticationController");
const authenticationController = new AuthenticationController();

router.post("/login", authenticationController.login);

router.all("*", next => next(Boom.Method("Method not allowed")));

module.exports = router;
