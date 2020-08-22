const { authJwt } = require("../middlewares");
const controller = require("../controllers/product.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/product/country", controller.getCountry);

  app.get("/api/product/marques", controller.getMarques);


  app.post("/api/product/create", controller.createProduct);

  app.post("/api/product/update", controller.updateProduct);

  app.get("/api/products", controller.getAllProducts);

  app.get("/api/products/details", controller.getProduct);

  app.get("/api/products/user", controller.getProductByUser);


  app.post("/api/products/search", controller.getProductsByCriteria);


  app.delete(
    "/api/product/delete",
    [authJwt.verifyToken],
    controller.removeProduct
  );




};
