const db = require("../../models/index");
const Usuario = db.usuario

async function cadastrarUsuario(nome, login, senha, dataNascimento, genero) {
    try{
        const usuario = await Usuario.create({
            nome,
            login,
            senha,
            dataNascimento,
            genero,
        });

        console.log("user successfully registered", usuario);
        return usuario;
    }catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
}

module.exports = { cadastrarUsuario }; 