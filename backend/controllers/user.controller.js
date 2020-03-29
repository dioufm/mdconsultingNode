const db = require("../model");
const User = db.user;
const Role = db.role;

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
    var userMap = {};

    /*users.forEach(function (user) {
      userMap[user._id] = user;
    });

    res.send(userMap);
    */
    res.status(200).send(users);
  });
};


exports.deleteUser = (req, res) => {
  User.findByIdAndRemove({ _id: req.headers._id }, function (err, users) {
    var userMap = {};

    /*users.forEach(function (user) {
      userMap[user._id] = user;
    });

    res.send(userMap);
    */
    res.status(200).send(users);
  });
};





exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

