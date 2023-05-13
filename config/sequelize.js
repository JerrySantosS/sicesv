// Inicialização da conexao com o Banco de Dados
//Inicialização do Sequelize

const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'sicesv',
  'me',
  '1234',
  {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres'
  }
)

module.exports = sequelize;
