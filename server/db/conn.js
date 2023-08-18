const { Sequelize } = require('sequelize')
require('dotenv').config()


const { DATABASE, 
    HOST,
    USER,
    PASSWORD,
    DIALECT 
} = process.env


const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
    host: HOST,
    dialect: 'postgres',
    /* dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // You can set this option to false if you're using a self-signed certificate
          }
      
    } */
  
})

try{
    sequelize.authenticate()
    console.log('Conectado com sucesso')
} catch(err) {
    console.log(`Não foi possível conectar: ${err}`)
}

module.exports = sequelize