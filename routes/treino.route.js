module.exports = (app) => {
  const treinoView = require("../controllers/treino-controller/treinoView.controller");
  const treinoUpdate = require("../controllers/treino-controller/treinoUpdate.controller");

  var router = require("express").Router();

  router.get("/", treinoView.findAll);
  router.get("/:id", treinoView.findOne);
  router.put("/", treinoUpdate.update);

  app.use("/api/treino", router);
};
