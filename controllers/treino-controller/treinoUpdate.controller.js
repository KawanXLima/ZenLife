const { sumTime } = require("../../utils/timeUtils");
const db = require("../../models/index");
const Treino = db.treino;
const Rotina = db.rotina;

exports.update = async (req, res) => {
  const { id, horario_inicial, duracao } = req.body;

  if (!horario_inicial || !duracao || !id) {
    return res.status(400).send({
      message: "Content can not be empty! Please fill all the fields.",
    });
  }

  // Calcula o horário final
  const horario_final = sumTime(horario_inicial, duracao);

  try {
    // Atualiza o treino
    const [updated] = await Treino.update(
      { horario_inicial, horario_final, duracao },
      { where: { id, usuarioId: req.user.id } }
    );

    if (updated) {
      return res.send({ message: "Treino was updated successfully." });
    } else {
      return res.status(400).send({
        message: `Could not update Treino with id=${id}.`,
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: "Error updating Treino with id=" + id,
      error: error.message,
    });
  }
};
