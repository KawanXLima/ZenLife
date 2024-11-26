const { sumDate } = require("../../utils/dateUtils");
const db = require("../../models/index");
const Rotina = db.rotina;
const moment = require("moment");

exports.update = async (req, res) => {
  const { id, data_inicio, duracao } = req.body;

  if (!data_inicio || !duracao || !id) {
    return res.status(400).send({
      message: "Content can not be empty! Please fill all the fields.",
    });
  }

  try {
    // Valida se a data_inicio é válida e se é hoje ou no futuro
    const dataInicial = moment(data_inicio, "DD/MM/YYYY", true);
    const hoje = moment().startOf("day"); // Data atual sem horas
    if (!dataInicial.isValid() || dataInicial.isBefore(hoje)) {
      return res.status(400).send({
        message:
          "Invalid date. The date must be today or a future date in the format DD/MM/YYYY.",
      });
    }

    // Calcula a data final
    const data_final = sumDate(data_inicio, duracao);

    const rotina_atualizada = {
      data_inicio: formatToISO(data_inicio),
      data_final: formatToISO(data_final),
      duracao,
    };

    // Atualiza a rotina no banco de dados
    const [updated] = await Rotina.update(rotina_atualizada, {
      where: { id, usuarioId: req.user.id }, // Garante que a rotina pertence ao usuário autenticado
    });

    if (updated) {
      res.send({ message: "Rotina was updated successfully." });
    } else {
      res.status(404).send({
        message: `Cannot update Rotina with id=${id}. Rotina not found or does not belong to the authenticated user.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating Rotina with id=" + id,
      error: err.message,
    });
  }
};

function formatToISO(date) {
  const [day, month, year] = date.split("/");
  return `${year}-${month}-${day}`;
}
