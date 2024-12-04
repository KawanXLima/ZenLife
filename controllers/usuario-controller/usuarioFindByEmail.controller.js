const db = require("../../models/index");
const Rotina = db.rotina;
const Usuario = db.usuario;

exports.findOneByEmail = (req, res) => {
  const email = req.params.login;

  Usuario.findOne({
    where: { login: email },
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Usuario with email=${email}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Usuario with email=" + email,
        error: err.message,
      });
    });
};
