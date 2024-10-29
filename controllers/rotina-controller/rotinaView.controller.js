const db = require("../../models/index");
const Rotina = db.rotina;
const Treino = db.treino;


exports.findAll = async (req, res) => {
    // Find all users
    try {
        const rotina = await Rotina.findAll({
            include: [{
                model: Treino,
                as: "treinos", // Certifique-se de que este alias está correto
            }],
        });

        res.send(rotina);
    }
    catch (error) {
        res.status(404).send({
            message:
                error.message || "Some error occurred while retrieving funcionario.",
        });

    }
};