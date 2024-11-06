const { sumTime } = require("../../utils/timeUtils");
const db = require("../../models/index");
const { ExclusionConstraintError } = require("sequelize");
const Treino = db.treino;

exports.update = (req, res) => {
  const id = req.params.id;

  let { horario_inicial, horario_final, duracao } = req.body;

  if (!horario_inicial || !duracao || !id) {
    return res.status(400).send({
      message: "Content can not be empty! Please fill all the fields.",
    });
  }
  horario_final = sumTime(horario_inicial, duracao);
  
  const treino_atualizado = {
    horario_inicial: horario_inicial,
    horario_final: horario_final,
    duracao: duracao,
  };

  Treino.update(treino_atualizado, {
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
