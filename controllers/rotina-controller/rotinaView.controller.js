const db = require("../../models/index");
const Rotina = db.rotina;
const Treino = db.treino;
const Exercicio = db.exercicio;

exports.findAll = async (req, res) => {
  try {
    const rotina = await Rotina.findAll({
      include: [
        {
          model: Treino,
          as: "treinos",
          include: [
            {
              model: Exercicio,
              as: "exercicios",
            },
          ],
        },
      ],
    });

    res.send({ rotina: rotina });
  } catch (error) {
    res.status(404).send({
      message:
        error.message || "Some error occurred while retrieving rotina.",
    });
  }
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Rotina.findByPk(id, {
    include: [
      {
        model: Treino,
        as: "treinos",
        include: [
          {
            model: Exercicio,
            as: "exercicios",
          },
        ],
      },
    ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Rotina with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Rotina with id=" + id,
        error: err.message,
      });
    });
};
