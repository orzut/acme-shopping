const express = require("express");
const app = express.Router();
const { User } = require("../db");
const { isLoggedIn } = require("./middleware");

module.exports = app;

app.post("/", async (req, res, next) => {
  try {
    const credentials = {
      email: req.body.email,
      password: req.body.password,
    };
    res.send({ token: await User.authenticate(credentials) });
  } catch (ex) {
    next(ex);
  }
});

app.get("/", isLoggedIn, async (req, res, next) => {
  res.send(req.user);
});
