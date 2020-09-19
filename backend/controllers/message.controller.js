const db = require("../model");
const fs = require("fs");
var btoa = require("btoa");
var sharp = require("sharp");

//mail:
const nodemailer = require("nodemailer");

const User = db.user;

const Message = db.message;

const Country = db.country;
const Product = db.product;

exports.createMessage = (req, res) => {
  User.findOne({ _id: req.body.userId }, function (err, user) {
    Product.findOne({ _id: req.body.productId }, function (err, product) {
      User.findOne({ _id: product.user._id }, function (err, userReceiver) {
        const message = new Message();
        message.userSender = {
          _id: user._id,
          username: user.username,
          email: user.email,
        };
        message.userReceiver = {
          _id: product.user._id,
          username: userReceiver.username,
          email: userReceiver.email,
        };
        message.product = { productId: product.id, productname: product.titre };
        message.message = req.body.message;

        message.save((err, message) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          } else {
            sendMailTo(user, (err, info) => {
              if (err) {
                console.log(err);
                res.status(400);
                res.send({ error: "Failed to send email" });
              } else {
                console.log("Email has been sent");
                res.send(info);

                res.status(200).send({
                  message,
                });
              }
            });
          }
        });
      });
    });
  });
};

exports.createAnswerMessage = (req, res) => {
  User.findOne({ _id: req.body.userId }, function (err, user) {
    Message.findOne({ _id: req.body.currentMessageId }, function (
      err,
      existingMessage
    ) {
      const message = new Message();
      message.userSender = {
        _id: user._id,
        username: user.username,
        email: user.email,
      };
      message.userReceiver = existingMessage.userSender;

      message.product = {
        productId: existingMessage.product.productId,
        productname: existingMessage.product.productname,
      };
      message.message = req.body.message;

      message.save((err, message) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        } else {
          sendMailTo(user, (err, info) => {
            if (err) {
              console.log(err);
              res.status(400);
              res.send({ error: "Failed to send email" });
            } else {
              console.log("Email has been sent");
              res.send(info);

              res.status(200).send({
                message,
              });
            }
          });
        }
      });

      //update user compteur receive new message
      User.findOne({ _id: message.userReceiver._id }, function (
        err,
        userReceiver
      ) {
        userReceiver.countnewMessage = user.countnewMessage + 1;
        userReceiver.save((err, user) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
        });
      });
    });
  });
};

exports.getMessagesByUser = (req, res) => {
  User.findOne({ _id: req.headers.userid }, function (err, user) {
    //
    Message.find(
      { $or: [{ "userSender._id": user.id }, { "userReceiver._id": user.id }] },
      function (err, messages) {
        messages.forEach(function (message) {
          if (message.userSender._id === user.id) {
            message.sent = 1;
          } else {
            message.sent = 0;
          }
        });
        res.status(200).send(messages);
      }
    );
  });
};

exports.sendmail = (req, res) => {
  console.log("starting to send mail");
  let user = req.body;
  sendMailTo(user, (err, info) => {
    if (err) {
      console.log(err);
      res.status(400);
      res.send({ error: "Failed to send email" });
    } else {
      console.log("Email has been sent");
      res.send(info);
    }
  });
};

const sendMailTo = (user, callback) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "mamad.diouf@gmail.com",
      pass: "souleyE59@@",
    },
  });
  const mailOptions = {
    from: `"<Sender’s name>", "<Sender’s email>"`,
    // to: `<${user.email}>`,
    to: `mamad.diouf@gmail.com`,
    subject: "<Message subject>",
    html: "<h1>And here is the place for HTML</h1>",
  };
  transporter.sendMail(mailOptions, callback);
};
