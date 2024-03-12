const { DataTypes } = require('sequelize'); // importa os tipos de dados do banco
const sequelize = require('../../config/sequelize'); // importa a conexão com o banco

// definição do model
const User = sequelize.define(
  'User', // nome do model
  {
    id: {
      // definie a coluna id
      type: DataTypes.INTEGER, // tipo inteiro
      primaryKey: true, // chave primária
      autoIncrement: true, // incremento automático
      allowNull: false, // não pode ser nulo
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '', // valor padrão ''
    },
    userName: {
      type: DataTypes.STRING(13),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
  },
  { paranoid: true }
);

// (async () => {
//   await User.sync({ alter: true });
// })();

module.exports = User;
