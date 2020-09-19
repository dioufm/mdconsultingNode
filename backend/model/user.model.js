const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    firstname: String,
    email: String,
    tel: String,
    showTel: String,
    telwhatsapp: String,
    showTelWhatsapp: String,
    numberproduct: { type: Number, default: 0 },
    numberproductachat: { type: Number, default: 0 },
    credit: { type: Number, default: 0 },
    countnewMessage: { type: Number, default: 0 },
    origineConnexion: { type: String, default: "SITE" },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
    dateCreation: { type: Date, default: Date.now },
    lastConnexionDate: { type: Date, default: Date.now },
    cgu: { type: String, default: "1" },
    photo: {
      size: { type: Number },
      filename: { type: String },
      data: { type: Buffer },
      contentType: { type: String },
      imageUrl: { type: String },
    },
  })
);

module.exports = User;
