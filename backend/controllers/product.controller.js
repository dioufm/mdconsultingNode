const db = require("../model");
const fs = require('fs');
var btoa = require('btoa');
var sharp = require("sharp");

const Categorie = db.categorie;
const Product = db.product;
const User = db.user;

const Country = db.country;
const Marque = db.marque;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};



exports.deleteUser = (req, res) => {
  categories.findByIdAndRemove({ _id: req.headers._id }, function (err, users) {
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


exports.getMarques = (req, res) => {
  Marque.find({}, function (err, marques) {
    res.status(200).send(marques);
  });
};


exports.createProduct = (req, res) => {

  User.findOne({ _id: req.body.userId }, function (err, user) {

    Categorie.find({ code: req.body.product.categorieProduct }, function (err, categories) {
      let categorie1 = new Categorie();
      categorie1 = categories[0];

      let subCategorie1 = categories[0].subcategories.filter(function (subcategorie) {
        return subcategorie.code == req.body.product.subCategorieProduct;
      });
      let types1 = categories[0].types.filter(function (type) {
        return type.code == req.body.product.typeProduct;
      });


      categorie1.subcategories = subCategorie1;
      categorie1.types = types1;
      if (subCategorie1.length < 1 || types1.length < 1) {
        res.status(400).send({ message: "error datas" });
      }
      const product = new Product({
        typeOffre: req.body.product.typeOffre,
        categorie: categorie1,
        titre: getTitre(req.body.product, req.body.product.categorieProduct, types1[0]),
        description: req.body.product.description,
        prix: req.body.product.prix,

        surface: req.body.product.surface,
        newProduct: req.body.product.newProduct,

        typeOffre: req.body.product.typeOffre,
        nbPieces: req.body.product.nbPieces,

        marque: req.body.product.marque,
        modele: req.body.product.modele,
        km: req.body.product.km,
        boiteVitesse: req.body.product.boiteVitesse,
        carburant: req.body.product.carburant,
        nbPlaces: req.body.product.nbPlaces,

        ville: req.body.product.ville,
        villeName: req.body.product.villeName,

        user: user
      });


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


exports.updateProduct = (req, res) => {

  Product.findOne({ _id: req.body.product._id }, function (err, product) {
    User.findOne({ _id: req.body.userId }, function (err, user) {

      Categorie.find({ code: req.body.product.categorieProduct }, function (err, categories) {
        let categorie1 = new Categorie();
        categorie1 = categories[0];

        let subCategorie1 = categories[0].subcategories.filter(function (subcategorie) {
          return subcategorie.code == req.body.product.subCategorieProduct;
        });
        let types1 = categories[0].types.filter(function (type) {
          return type.code == req.body.product.typeProduct;
        });


        categorie1.subcategories = subCategorie1;
        categorie1.types = types1;
        if (subCategorie1.length < 1 || types1.length < 1) {
          res.status(400).send({ message: "error datas" });
        }
        product.typeOffre = req.body.product.typeOffre;
        product.categorie = categorie1;
        product.titre = getTitre(req.body.product, req.body.product.categorieProduct, types1[0]);
        product.description = req.body.product.description;
        product.prix = req.body.product.prix;

        product.surface = req.body.product.surface;
        product.newProduct = req.body.product.newProduct;

        product.typeOffre = req.body.product.typeOffre;
        product.nbPieces = req.body.product.nbPieces;

        product.marque = req.body.product.marque;
        product.modele = req.body.product.modele;
        product.km = req.body.product.km;
        product.boiteVitesse = req.body.product.boiteVitesse;
        product.carburant = req.body.product.carburant;
        product.nbPlaces = req.body.product.nbPlaces;

        product.ville = req.body.product.ville;
        product.villeName = req.body.product.villeName;

        product.user = user

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
  });
}



exports.getAllProducts = (req, res) => {
  Product.find({}, function (err, products) {
    products.forEach(function (product) {
      product.photos.forEach(function (photo) {
        var imgdata = btoa(photo.data);
        var img = "data:image/" + photo.contentType.substring(1, 5) + ";base64," + imgdata;
        photo.imageUrl = img;
        photo.data = null;
      });
    });
    res.status(200).send(products);
  });
};

exports.getProduct = (req, res) => {

  Product.findOne({ _id: req.headers.productid }, function (err, product) {
    //.populate("user", "-__v")
    // .exec((err, product) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    } else {
      if (product != null) {

        let productCaracteritiques = new Map();
        //immobilier
        productCaracteritiques.set("surface", product.surface);
        productCaracteritiques.set("nbPieces", product.nbPieces);

        //voitures
        productCaracteritiques.set("marque", product.marque);
        productCaracteritiques.set("modele", product.modele);
        productCaracteritiques.set("km", product.km);
        productCaracteritiques.set("boiteVitesse", product.boiteVitesse);
        productCaracteritiques.set("carburant", product.carburant);
        productCaracteritiques.set("nbPlaces", product.nbPlaces);

        product.productCaracteritiques = productCaracteritiques;

        product.photos.forEach(function (photo) {
          var imgdata = btoa(photo.data);
          var img = "data:image/" + photo.contentType.substring(1, 4) + ";base64," + imgdata;
          photo.imageUrl = img;
          photo.data = null;
        });

        User.findOne({ _id: product.user }, function (err, user) {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          //product.user = user;
          if (user.photo != null && user.photo.data != null) {
            var imgdata = btoa(user.photo.data);
            var img = "data:image/" + user.photo.contentType.substring(1, 4) + ";base64," + imgdata;
            user.photo.imageUrl = img;
            user.photo.data = null;
          }
          product.userdata = user;
          //   });
          res.status(200).send(product);
        });


      }
    }

  });
};


exports.getProductByUser = (req, res) => {
  User.findOne({ _id: req.headers.userid }, function (err, user) {
    Product.find({ "user": user._id }, function (err, products) {
      products.forEach(function (product) {
        product.photos.forEach(function (photo) {
          var imgdata = btoa(photo.data);
          var img = "data:image/" + photo.contentType.substring(1, 5) + ";base64," + imgdata;
          photo.imageUrl = img;
          photo.data = null;
        });
      });
      res.status(200).send(products);
    });
  });
};






getTitre = (product, categorieProduct, types) => {
  let typeOffre = product.typeOffre == 'VENTE' ? 'vente' : "Recherche";
  let productNew = product.newProduct == '1' ? 'neuve' : '';
  //vehicule
  if (categorieProduct == 'VEH') {

    return typeOffre + " " + types.name + " " + productNew + " " + product.marque + " " + product.modele + " ";
  }
  if (categorieProduct == 'IMO') {
    return typeOffre + " " + types.name + " " + productNew + " ";
  }
}



exports.removeProduct = (req, res) => {
  Product.findByIdAndRemove({ _id: req.headers._id }, function (err, products) {
    res.status(200).send(products);
  });
};