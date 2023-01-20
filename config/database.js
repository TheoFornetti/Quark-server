require('dotenv').config();

module.exports = {
  // Conexión
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD|| "contra",
  database: process.env.DB_DATABASE||"sequelize",
  host: process.env.DB_HOST||"localhost",
  port: 5972 || 3036,
  dialect:  process.env.DB_DIALECT||"mysql",
  // username:  "root",
  // password:  "contra",
  // database: "sequelize",
  // host:"localhost",
  // dialect:  "mysql",
  
  // Configurar Seeds
  seederStorage: "sequelize",
  //seederStoragePath: "sequelizeSeeds.json",
  seederStorageTableName: "SequelizeSeeds",
  
  
}