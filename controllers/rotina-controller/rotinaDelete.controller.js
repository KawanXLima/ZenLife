const db = require("../../models/index");
const Rotina = db.rotina;

exports.delete = (req, res) => {
  const id = req.params.id;

  Rotina.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: "Rotina was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Rotina with id=${id}. Maybe Rotina was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Rotina with id=" + id,
        error: err.message,
      });
    });
};
