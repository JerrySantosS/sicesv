// Inicialização da conexao com o Banco de Dados
//Inicialização do Sequelize

const Sequelize = require('sequelize');

const sequelize = new Sequelize('sicesv', 'me', '1234', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
});
// testing connection with database
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;
