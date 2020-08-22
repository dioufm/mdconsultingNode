const db = require("../model");
var btoa = require('btoa');
const User = db.user;
const Role = db.role;
const Categorie = db.categorie;
const Product = db.product;
var bcrypt = require("bcryptjs");

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};


exports.getAllusers = (req, res) => {
  User.find({}, function (err, users) {
    res.status(200).send(users);
  });
};


exports.deleteUser = (req, res) => {
  User.findByIdAndRemove({ _id: req.headers._id }, function (err, users) {
    res.status(200).send(users);
  });
};


exports.getUserById = (req, res) => {
  User.findOne({ _id: req.headers._id }.populate("roles", "-__v"), function (err, user) {
    res.status(200).send(user);
  });
};


exports.getUserById = (req, res) => {
  User.findOne({
    _id: req.headers._id
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }


      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push(user.roles[i].name.toUpperCase());
      }
      if (user.photo.data != null) {
        var imgdata = btoa(user.photo.data);
        var img = "data:image/" + user.photo.contentType.substring(1, 4) + ";base64," + imgdata;
        user.photo.imageUrl = img;
        user.photo.data = null;
      }


      res.status(200).send({
        user: user,
        roles: authorities
      });
    });
};


exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.updateUserInfos = (req, res) => {

  //update  user infos
  User.find({ email: req.body.user.email }, function (err, users) {
    var user = users[0];
    user.username = req.body.user.user_name;
    user.firstname = req.body.user.user_firstname;
    user.tel = req.body.user.tel;
    user.telwhatsapp = req.body.user.telwhatsapp;
    user.numberproduct = user.numberproduct + 1;

    user.save((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      //update product user
      Product.findOne({ _id: req.body.productId }, function (err, product) {
        product.user = [user._id];
        product.save((err, product) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
        });

        res.status(200).send({
          product
        });
      });
    });
  });
}


exports.validateUserInfos = (req, res) => {

  //update  user infos
  User.findOne({ _id: req.body.user._id }, function (err, user) {
    user.username = req.body.user.username;
    user.firstname = req.body.user.firstname;
    user.tel = req.body.user.tel;
    user.showTel = req.body.user.showTel;
    user.telwhatsapp = req.body.user.telwhatsapp;
    user.showTelWhatsapp = req.body.user.showTelWhatsapp;
    user.photo = req.body.user.photo;
    if (req.body.user.newpassword != null && req.body.user.newpassword != '') {
      var passwordIsValid = bcrypt.compareSync(
        req.body.user.newpassword,
        user.password
      );
      if (!passwordIsValid) {
        user.password = bcrypt.hashSync(req.body.user.newpassword, 8);
      }
    }

    //roles
    if (req.body.user.role) {
      Role.findOne({ name: req.body.user.role }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        user.roles = [role._id];
      }
      );
    }

    user.save((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).send({
        user
      });
    });
  });
}