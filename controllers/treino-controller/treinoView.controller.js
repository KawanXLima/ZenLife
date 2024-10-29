const db = require("../../models/index");
const Treino = db.treino;
const Exercicio = db.exercicio;

exports.findAll = async (req, res) => {
  try {
    const treino = await Treino.findAll({
      include: [
        {
          model: Exercicio,
          as: "exercicios",
        },
      ],
    });

    res.send({ rotina: treino });
  } catch (error) {
    res.status(404).send({
      message:
        error.message || "Some error occurred while retrieving treino.",
    });
  }
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Treino.findByPk(id, {
    include: [
      {
        model: Exercicio,
        as: "exercicios",
      },
    ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Treino with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Treino with id=" + id,
        error: err.message,
      });
    });
};
