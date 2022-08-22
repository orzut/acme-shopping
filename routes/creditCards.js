const express = require("express");
const { CreditCard } = require("../db");
const app = express.Router();
const { isLoggedIn } = require("./middleware");

module.exports = app;

app.get("/", isLoggedIn, async (req, res, next) => {
  try {
    res.send(
      await CreditCard.findAll({
        where: {
          userId: req.user.id,
        },
      })
    );
  } catch (ex) {
    next(ex);
  }
});

app.post("/", isLoggedIn, async (req, res, next) => {
  try {
    res.send(await req.user.addCreditCard(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.delete("/:id", isLoggedIn, async (req, res, next) => {
  try {
    const creditCard = await CreditCard.findByPk(req.params.id);
    await creditCard.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});
