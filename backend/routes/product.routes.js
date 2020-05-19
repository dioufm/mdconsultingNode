const controller = require("../controllers/product.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/product/categories", controller.getAllCategories);

  app.get("/api/product/country", controller.getCountry);


  app.post("/api/product/create", controller.createProduct);

  app.get("/api/products", controller.getAllProducts);

  app.get("/api/products/details", controller.getProduct);



};
