module.exports = (app) => {
  const usuarioCadastro = require("../controllers/usuario-controller/usuarioCreate.controller");
  const usuarioView = require("../controllers/usuario-controller/usuarioView.controller");
  const usuarioFindByEmail = require("../controllers/usuario-controller/usuarioFindByEmail.controller");

  var router = require("express").Router();

  router.post("/cadastro", usuarioCadastro.create);
  router.get("/:id", usuarioView.findOne);
  router.get("/email/:login", usuarioFindByEmail.findOneByEmail);

  app.use("/api/user", router);
};
