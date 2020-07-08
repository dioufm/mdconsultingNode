const controller = require("../controllers/categorie.controller");
const { authJwt } = require("../middlewares");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/categorie/categories", controller.getAllCategories);

  app.get("/api/categorie/details", [authJwt.verifyToken, authJwt.isAdmin], controller.getCategorieById);

  app.get("/api/categorie/detailsbycode", controller.getCategorieByCode);

  app.post("/api/categorie/update", controller.updateCategorie);

  app.post("/api/categorie/add", controller.addNewCategorie);

  app.delete(
    "/api/categorie/delete",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteCategorie
  );


};
