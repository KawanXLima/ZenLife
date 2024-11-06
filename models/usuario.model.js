module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define("usuario", {
        nome: {
            type: DataTypes.STRING,
           allowNull:false,
        },
        login: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        senha: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        data_nasc: {
            type: DataTypes.DATE,
            allowNull:false,
        },
        genero: {
            type: DataTypes.ENUM('Homem', 'Mulher'),
            allowNull:false,
        },
    });

    return Usuario;
};