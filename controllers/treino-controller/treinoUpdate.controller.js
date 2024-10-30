const db = require("../../models/index");
const Treino = db.treino;

exports.update = (req, res) => {
  const id = req.params.id;

  Treino.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Treino was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Treino with id=${id}. Maybe Treino was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Treino with id=" + id,
        error: err.message,
      });
    });
};
