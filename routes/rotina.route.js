module.exports = (app) => {
  const rotina = require("../controllers/rotina.controller.js");
  const rotinaView = require("../controllers/rotinaView.controller.js");
  var router = require("express").Router();

  // Create a new Rotina
  router.post("/", rotina.create);
  router.get("/", rotinaView.findAll);
  app.use("/api/rotina", router);
};
