const express = require("express");
const Boom = require("boom");
const router = express.Router();
const authenticationController = require("./../controllers/AuthenticationController");

router.post("/login", authenticationController.login);

router.all("*", next => next(Boom.Method("Method not allowed")));
