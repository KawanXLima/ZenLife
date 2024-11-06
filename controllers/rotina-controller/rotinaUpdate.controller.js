const { sumDate } = require("../../utils/dateUtils");
const db = require("../../models/index");
const Rotina = db.rotina;

exports.update = (req, res) => {
  const id = req.params.id;

  let { data_inicio, data_final, duracao } = req.body;

  if (!data_inicio || !duracao || !id) {
    return res.status(400).send({
      message: "Content can not be empty! Please fill all the fields.",
    });
  }

  data_final = sumDate(data_inicio, duracao);

  const rotina_atualizada = {
    data_inicio: data_inicio,
    data_final: data_final,
    duracao: duracao,
  };

  Rotina.update(rotina_atualizada, {
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
