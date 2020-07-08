const mongoose = require("mongoose");

const Categorie = mongoose.model(
  "Categorie",
  new mongoose.Schema({
    code: String,
    name: String,
    level: Number,
    color: String,
    icon: String,
    subcategories:
      [
        {
          code: String,
          name: String,
          level: Number,
          color: String,
          icon: String
        }
      ],
    types:
      [
        {
          code: String,
          name: String,
          icon: String
        }
      ]
  })
);

module.exports = Categorie;
