const mongoose = require("mongoose");

const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    categorie: {
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
      typeLogements:
        [
          {
            code: String,
            name: String,
            icon: String
          }
        ]
    },
    surface: Number,
    nbPieces: Number,
    titre: String,
    description: String,
    prix: Number,
    region: String,
    departement: String,
    ville: String,
    dateCreation: { type: Date, default: Date.now },
    photos:
      [{
        size: { type: Number },
        filename: { type: String },
        data: { type: Buffer },
        contentType: { type: String },
        imageUrl: { type: String },
        modificationDate: { type: Date, "default": Date.now }
      }],
    user: {
      username: String,
      email: String,
      password: String,
      roles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role"
        }
      ]
    }
  })
);

module.exports = Product;