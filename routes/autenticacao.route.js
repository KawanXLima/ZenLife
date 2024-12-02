module.exports = (app) => {
  const login = require("../controllers/autenticacao-controller/logar.controller.js");
  const deslog = require("../controllers/autenticacao-controller/deslogar.controller.js");
  const validarLogin = require("../controllers/autenticacao-controller/logado.controller.js")
  var router = require("express").Router();

  router.post("/login", login.logar);
  router.get("/deslogar", validarLogin.logado, deslog.deslogar);

  app.use("/api", router);
};
