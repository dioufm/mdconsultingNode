const mongoose = require("mongoose");

let subCategorieSchema = new mongoose.Schema({
  code: String,
  name: String,
  level: Number,
  color: String,
  icon: String
});


module.exports = mongoose.model('SubCategorie', subCategorieSchema);

