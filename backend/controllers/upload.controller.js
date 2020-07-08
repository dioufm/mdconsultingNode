const util = require("util");
const fs = require("fs");
const db = require("../model");
const path = require('path')
const Photo = db.photo;
const Product = db.product;
const User = db.user;


// CREATE
exports.uploadFile = function (req, res, next) {

    let photos = []
    const proudctId = req.headers.productid;
    let file = req.file;
    var image = {
        modificationDate: new Date(),
        size: file.size || 0,
        filename: file.originalname,
        data: fs.readFileSync(file.path),
        contentType: path.extname(file.originalname)
    };
    //photos.push(new Photo(image));
    doc = new Photo(image);


    Product.findOne({ _id: proudctId }, function (err, product) {
        if (err) return res.status(500).send(err)
        if (product != null) {
            product.photos.push(doc);
            product.save();
        }
        if (err) return res.status(500).send(err)
        var retObj = {
            doc: doc,
            err: err
        };
        return res.send(retObj);

    });

}


exports.uploadUserPicture = function (req, res, next) {

    let photos = []
    const userId = req.headers.userid;
    let file = req.file;
    var image = {
        modificationDate: new Date(),
        size: file.size || 0,
        filename: file.originalname,
        data: fs.readFileSync(file.path),
        contentType: path.extname(file.originalname)
    };
    //photos.push(new Photo(image));
    doc = new Photo(image);


    User.findOne({ _id: userId }, function (err, user) {
        if (err) return res.status(500).send(err)
        if (user != null) {
            user.photo = doc;
            user.save();
        }
        if (err) return res.status(500).send(err)
        var retObj = {
            doc: doc,
            err: err
        };
        return res.send(retObj);

    });

}