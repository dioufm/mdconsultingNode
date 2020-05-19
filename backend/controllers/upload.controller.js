const util = require("util");
const fs = require("fs");
const db = require("../model");
const path = require('path')
const Photo = db.photo;
const Product = db.product;


// CREATE
exports.uploadFile = function (req, res, next) {

    const proudctId = req.headers.productid;
    var image = {
        modificationDate: new Date(),
        size: req.file.size || 0,
        filename: req.file.originalname,
        data: fs.readFileSync(req.file.path),
        contentType: path.extname(req.file.originalname)
    };
    doc = new Photo(image);

    //doc.save(function (err) {

    // if (err == null) {
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
    //  }
    // });

    //        }
    // });
}