const mongoose = require("mongoose");

const Message = mongoose.model(
  "Message",
  new mongoose.Schema({
    userSender: {
      _id: String,
      username: String,
      email: String,
    },
    userReceiver: {
      _id: String,
      username: String,
      email: String,
    },
    message: String,
    product: {
      productname: String,
      productId: String,
    },
    sent: Number,

    dateCreation: { type: Date, default: Date.now },
  })
);

module.exports = Message;
