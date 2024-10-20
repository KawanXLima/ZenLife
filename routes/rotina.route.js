module.exports = (app) => {
  const rotina = require("../controllers/rotina.controller.js");

  var router = require("express").Router();

  // Create a new Rotina
  router.post("/", rotina.create);
  
  app.use("/api/rotina", router);
};
