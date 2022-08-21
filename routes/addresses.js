const express = require("express");
const { Address } = require("../db");
const app = express.Router();
const { isLoggedIn } = require("./middleware");

module.exports = app;

app.get("/", isLoggedIn, async (req, res, next) => {
  try {
    res.send(
      await Address.findAll({
        where: {
          userId: req.user.id,
        },
      })
    );
  } catch (ex) {
    next(ex);
  }
});
