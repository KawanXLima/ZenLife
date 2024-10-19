module.exports = (sequelize, DataTypes) => {
  const Treino = sequelize.define("treino", {
    horario_inicial: {
      type: DataTypes.TIME(6),
    },
    horario_final: {
      type: DataTypes.TIME(6),
    },
    duracao: {
      type: DataTypes.TIME(6),
    },
    dia_atual: {
      type: DataTypes.DATEONLY,
    },
  });

  return Treino;
};
