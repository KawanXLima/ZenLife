module.exports = (app) => {
  const rotinaGerar = require("../controllers/rotina-controller/rotinaGerar.controller");
  const rotinaView = require("../controllers/rotina-controller/rotinaView.controller");
  const rotinaUpdate = require("../controllers/rotina-controller/rotinaUpdate.controller");
  const rotinaDelete = require("../controllers/rotina-controller/rotinaDelete.controller");

  var router = require("express").Router();

  router.post("/", rotinaGerar.create);
  router.get("/all/:id", rotinaView.findAll);
  router.get("/:id", rotinaView.findOne);
  router.put("/", rotinaUpdate.update);
  router.delete("/:id", rotinaDelete.delete);

  app.use("/api/rotina", router);
};
