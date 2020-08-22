const mongoose = require("mongoose");

let typesSchema = new mongoose.Schema({
  code: String,
  name: String,
  level: Number,
  color: String,
  icon: String
});


module.exports = mongoose.model('TypeCategorie', typesSchema);

