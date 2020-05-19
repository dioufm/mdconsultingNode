const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    dateCreation: { type: Date, default: Date.now },
    lastConnexionDate: { type: Date, default: Date.now },
  })
);

module.exports = User;
