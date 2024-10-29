module.exports = (app) => {
  const rotinaGerar = require("../controllers/rotina-controller/rotinaGerar.controller");
  const rotinaView = require("../controllers/rotina-controller/rotinaView.controller");
  var router = require("express").Router();

  // Create a new Rotina
  router.post("/", rotinaGerar.create);
  router.get("/", rotinaView.findAll);
  app.use("/api/rotina", router);
};
