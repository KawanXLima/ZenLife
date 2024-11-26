module.exports = (app) => {
  const validarLogin = require("../controllers/autenticacao-controller/logado.controller");
  const usuarioCadastro = require("../controllers/usuario-controller/usuarioCreate.controller");
  const usuarioView = require("../controllers/usuario-controller/usuarioView.controller");

  var router = require("express").Router();

  router.post("/cadastro", usuarioCadastro.create);
  router.get("/:id", validarLogin.logado, usuarioView.findOne);

  app.use("/api/user", router);
};
