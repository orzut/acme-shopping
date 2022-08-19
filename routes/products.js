const express = require("express");
const { Product, Category, Genre } = require("../db");
const app = express.Router();
const { isAdmin } = require("./middleware");

module.exports = app;

app.get("/", async (req, res, next) => {
  try {
    res.send(await Product.findAll({ include: [Category, Genre] }));
  } catch (ex) {
    next(ex);
  }
});

app.get("/:id", async (req, res, next) => {
  try {
    res.send(await Product.findByPk(req.params.id));
  } catch (ex) {
    next(ex);
  }
});

app.get("/genre/:id", async (req, res, next) => {
  try {
    res.send(await Product.findAll({ where: { genreId: req.params.id } }));
  } catch (ex) {
    next(ex);
  }
});

app.get("/category/:id", async (req, res, next) => {
  try {
    res.send(await Product.findAll({ where: { categoryId: req.params.id } }));
  } catch (ex) {
    next(ex);
  }
});
