/**
 * Created by theotheu on 02-11-13.
 */

/**
 * Module dependencies.
 */
const mongoose = require("mongoose");

const Photo = mongoose.model(
  "Photo",
  /* Schema definitions */
  new mongoose.Schema({                                // <--- nested document (not sub document)
    size: { type: Number },
    filename: { type: String },
    data: { type: Buffer },
    contentType: { type: String },
    modificationDate: { type: Date, "default": Date.now }
  })
);

module.exports = Photo;

