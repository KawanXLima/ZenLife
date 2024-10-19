module.exports = (sequelize, DataTypes) => {
    const Rotina = sequelize.define("rotina", {
        duracao: {
            type: DataTypes.TINYINT,
            allowNull:false,
        },
        data_inicio: {
            type: DataTypes.DATEONLY,
        },
        data_final: {
            type: DataTypes.DATEONLY,
        },
    });

    return Rotina;
};