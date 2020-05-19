const controller = require("../controllers/upload.controller");
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/upload", upload.single('file'), controller.uploadFile);

};
