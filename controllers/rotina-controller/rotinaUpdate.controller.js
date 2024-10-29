const db = require("../../models/index");
const Rotina = db.rotina;

exports.update = (req, res) => {
  const id = req.params.id;

  Rotina.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Rotina was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Rotina with id=${id}. Maybe Rotina was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Rotina with id=" + id,
        error: err.message,
      });
    });
};
