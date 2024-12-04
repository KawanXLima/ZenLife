module.exports = (app) => {
  const login = require("../controllers/autenticacao-controller/logar.controller.js");
  const deslog = require("../controllers/autenticacao-controller/deslogar.controller.js");
  var router = require("express").Router();

  router.post("/login", login.logar);
  router.get("/deslogar", deslog.deslogar);

  app.use("/api", router);
};
