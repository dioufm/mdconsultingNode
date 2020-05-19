const db = require("../model");
const fs = require('fs');
var btoa = require('btoa');
var sharp = require("sharp");

const Categorie = db.categorie;
const Product = db.product;
const User = db.user;

const Country = db.country;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.getAllCategories = (req, res) => {
  Categorie.find({}, function (err, categories) {
    var userMap = {};

    /*users.forEach(function (user) {
      userMap[user._id] = user;
    });

    res.send(userMap);
    */
    res.status(200).send(categories);
  });
};




exports.deleteUser = (req, res) => {
  categories.findByIdAndRemove({ _id: req.headers._id }, function (err, users) {
    var userMap = {};

    /*users.forEach(function (user) {
      userMap[user._id] = user;
    });

    res.send(userMap);
    */
    res.status(200).send(users);
  });
};



exports.getCountry = (req, res) => {

  Country.findOne({
    code: req.headers._region
  }).exec((err, region) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    } else {
      res.status(200).send(region);
    }


  });
};


exports.createProduct = (req, res) => {

  User.find({ _id: req.body.userId }, function (err, user) {

    Categorie.find({ code: req.body.product.categorieProduct }, function (err, categories) {
      let categorie1 = new Categorie();
      categorie1 = categories[0];
      let subCategorie1 = categories[0].subcategories.filter(function (subcategorie) {
        return subcategorie.code == req.body.product.subCategorieProduct;
      });
      let typeLogements1 = categories[0].typeLogements.filter(function (typeLogement) {
        return typeLogement.code == req.body.product.typeProduct;
      });
      categorie1.subcategories = subCategorie1;
      categorie1.typeLogements = typeLogements1;

      const product = new Product({
        typeOffre: req.body.product.typeOffre,
        categorie: categorie1,
        surface: req.body.product.surface,
        nbPieces: req.body.product.nbPieces,
        titre: req.body.product.titre,
        description: req.body.product.description,
        prix: req.body.product.prix,
        region: req.body.product.region,
        departement: req.body.product.departement,
        ville: req.body.product.ville
      });
      product.user = user;

      product.save((err, product) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.status(200).send({
          product
        });
      });
    });
  });
}


exports.getAllProducts = (req, res) => {
  Product.find({}, function (err, products) {
    var userMap = {};

    products.forEach(function (product) {
      product.photos.forEach(function (photo) {
        var imgdata = btoa(photo.data);
        var img = "data:image/" + photo.contentType.substring(1, 4) + ";base64," + imgdata;
        photo.imageUrl = img;
        photo.data = null;
      });
    });
    //res.send(userMap);
    res.status(200).send(products);
  });
};

exports.getProduct = (req, res) => {
  Product.find({ _id: req.headers.productid }, function (err, products) {
    if (err) {
      res.status(500).send({ message: err });
      return;
    } else {
      if (products != null) {
        products[0].photos.forEach(function (photo) {
          var imgdata = btoa(photo.data);
          var img = "data:image/" + photo.contentType.substring(1, 4) + ";base64," + imgdata;
          photo.imageUrl = img;
          photo.data = null;
        });
        res.status(200).send(products[0]);
      }
    }
  });
};
