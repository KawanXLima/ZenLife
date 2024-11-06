const db = require("../../models/index");
const Rotina = db.rotina;
const Usuario = db.usuario;

exports.findOne = (req, res) => {
  const id = req.params.id;

  Usuario.findByPk(id, {
    include: [
      {
        model: Rotina,
        as: "rotina",
      },
    ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Usuario with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Usuario with id=" + id,
        error: err.message,
      });
    });
};
