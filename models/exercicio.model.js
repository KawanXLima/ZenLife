module.exports = (sequelize, DataTypes) => {
    const Exercicio = sequelize.define("exercicio", {
      foco_exercicio: {
        type: DataTypes.STRING(100),
        allowNull:false,
      },
      repeticao: {
        type: DataTypes.TINYINT,
        allowNull:false,
      },
      serie: {
        type: DataTypes.TINYINT,
        allowNull:false,
      },
      tipo_exercicio: {
        type: DataTypes.STRING,
        allowNull:false,  
      },
      tempo:{
        type:DataTypes.TIME(6),
        allowNull:false,
      },
    });
  
    return Exercicio;
  };
  