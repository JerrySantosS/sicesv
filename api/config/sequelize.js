// Inicialização da conexao com o Banco de Dados
//Inicialização do Sequelize
const Sequelize = require('sequelize');

// cria uma nova instância de conexão com o BD
const sequelize = new Sequelize('sicesv', 'me', '1234', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
});

// Testa a conexão com o banco de dados
(async () => {
  try {
    await sequelize.authenticate();
    console.log('O Banco de dados está conectado! :)');
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
  }
})();

module.exports = sequelize;
