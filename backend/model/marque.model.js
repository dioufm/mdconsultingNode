const mongoose = require("mongoose");

const Marque = mongoose.model(
  "Marque",
  new mongoose.Schema({
    marque: String,
    order: String,
    modeles:
      [
        {
          name: String
        }
      ]
  })
);

module.exports = Marque;
