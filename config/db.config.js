module.exports = {
    HOST: process.env.SUPA_BASE_HOST,
    USER: process.env.SUPA_BASE_USER,
    PASSWORD: process.env.SUPA_BASE_PASSWORD,
    DB: process.env.SUPA_BASE_DATABASE,
    port: process.env.SUPA_BASE_PORT,
    dialect: "postgresql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  };
  