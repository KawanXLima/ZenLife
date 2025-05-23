const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.port,
  operatorAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.treino = require("./treino.model")(sequelize, Sequelize);
db.exercicio = require("./exercicio.model")(sequelize, Sequelize);
db.rotina = require("./rotina.model")(sequelize, Sequelize);

const rotina = db.rotina;
const treino = db.treino;
const exercicio = db.exercicio;

rotina.hasMany(treino, {
  foreignKey: 'rotinaId',
});
treino.belongsTo(rotina);

treino.belongsToMany(exercicio, { through: 'TreinoExercicio' });
exercicio.belongsToMany(treino, { through: 'TreinoExercicio' });

module.exports = db;
