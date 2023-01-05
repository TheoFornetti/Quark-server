require('dotenv').config();

module.exports = {
  // Conexión
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD|| "contra",
  database: process.env.DB_DATABASE||"sequelize",
  host: process.env.DB_HOST||"localhost",
  port: 6517 || 3036,
  dialect:  process.env.DB_DIALECT||"mysql",
  
  // Configurar Seeds
  seederStorage: "sequelize",
  //seederStoragePath: "sequelizeSeeds.json",
  seederStorageTableName: "SequelizeSeeds",
  
  define: {
    

    // Genera claves foraneas de este tipo user_id en vez de userId
    
  }
}