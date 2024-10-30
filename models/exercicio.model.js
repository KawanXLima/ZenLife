module.exports = (sequelize, DataTypes) => {
    const Exercicio = sequelize.define("exercicio", {
      foco_exercicio: {
        type: DataTypes.STRING(100),
        allowNull:false,
      },
      repeticao: {
        type: DataTypes.SMALLINT,
        allowNull:false,
      },
      serie: {
        type: DataTypes.SMALLINT,
        allowNull:false,
      },
      tipo_exercicio: {
        type: DataTypes.STRING(100),
        allowNull:false,  
      },
      tempo:{
        type:DataTypes.TIME(6),
        allowNull:false,
      },
    });
  
    return Exercicio;
  };
  