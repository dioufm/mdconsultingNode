const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.categorie = require("./categorie.model");
db.subcategorie = require("./subcategorie.model");
db.country = require("./country.model");
db.photo = require("./photo.model");

db.ROLES = ["user", "admin", "moderator"];




module.exports = db;