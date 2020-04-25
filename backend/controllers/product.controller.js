const db = require("../model");
const Categorie = db.categorie;

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


