const { authJwt } = require("../middlewares");
const controller = require("../controllers/message.controller");

module.exports = function (app) {
  app.post("/api/message/create", controller.createMessage);

  app.post("/api/message/answer", controller.createAnswerMessage);

  app.get("/api/messages/user", controller.getMessagesByUser);
};
