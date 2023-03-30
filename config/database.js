require('dotenv').config();

module.exports = {
  // Conexión
  username: process.env.DB_USERNAME ,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: 3306,
  dialect:  process.env.DB_DIALECT,
  
  
  // Configurar Seeds
  seederStorage: "sequelize",
  //seederStoragePath: "sequelizeSeeds.json",
  seederStorageTableName: "SequelizeSeeds",
  
  
}