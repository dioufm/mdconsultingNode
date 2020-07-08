const db = require("../model");
const { authJwt } = require("../middlewares");
const Categorie = db.categorie;


const Country = db.country;
const Marque = db.marque;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.getAllCategories = (req, res) => {
  Categorie.find({}, function (err, categories) {
    res.status(200).send(categories);
  });
};


exports.getCategorieById = (req, res) => {
  Categorie.findOne({ _id: req.headers.categorieid }, function (err, categorie) {
    res.status(200).send(categorie);
  });
};


exports.getCategorieByCode = (req, res) => {
  Categorie.findOne({ code: req.headers.categoriecode }, function (err, categorie) {
    res.status(200).send(categorie);
  });
};



exports.updateCategorie = (req, res) => {

  //update  user infos
  Categorie.findOne({ _id: req.body.categorie._id }, function (err, categorie) {
    categorie.code = req.body.categorie.code;
    categorie.name = req.body.categorie.name;
    categorie.level = req.body.categorie.level;
    categorie.color = req.body.categorie.color;
    categorie.icon = req.body.categorie.icon;
    categorie.subcategories = req.body.categorie.subcategories;
    categorie.types = req.body.categorie.types;

    categorie.save((err, categorie) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).send({
        categorie
      });
    });
  });
};



exports.addNewCategorie = (req, res) => {

  new Categorie({
    code: req.body.categorie.code,
    name: req.body.categorie.name,
    level: req.body.categorie.level,
    color: req.body.categorie.color,
    icon: req.body.categorie.icon,
    subcategories: req.body.categorie.subcategories,
    types: req.body.categorie.types
  }).save((err, categorie) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({
      categorie
    });
  });
};



exports.deleteCategorie = (req, res) => {
  Categorie.findByIdAndRemove({ _id: req.headers._id }, function (err, categories) {
    res.status(200).send(categories);
  });
};
