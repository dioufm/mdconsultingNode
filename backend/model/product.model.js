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
      types:
        [
          {
            code: String,
            name: String,
            icon: String
          }
        ]
    },
    typeOffre: String,
    newProduct: String,

    surface: Number,
    nbPieces: Number,

    marque: String,
    modele: String,
    km: String,
    boiteVitesse: String,
    carburant: String,
    nbPlaces: String,

    titre: String,
    description: String,
    prix: Number,
    ville: String,
    villeName: String,
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

    user:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    statut: { type: String, "default": 'PUBLIE' },

    userdata:
    {
      username: String,
      password: String,
      firstname: String,
      email: String,
      tel: String,
      showTel: String,
      telwhatsapp: String,
      showTelWhatsapp: String,
      numberproduct: Number,
      photo:
      {
        size: { type: Number },
        filename: { type: String },
        data: { type: Buffer },
        contentType: { type: String },
        imageUrl: { type: String }
      },
      dateCreation: { type: Date, default: Date.now },
      lastConnexionDate: { type: Date, default: Date.now },
    }
  })
);

module.exports = Product;