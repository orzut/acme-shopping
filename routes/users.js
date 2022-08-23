const express = require("express");
const app = express.Router();
const { User } = require("../db");

module.exports = app;

app.post("/", async (req, res, next) => {
  try {
    res.send(await User.create(req.body));
  } catch (ex) {
    next(ex);
  }
});
