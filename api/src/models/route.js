const { DataTypes } = require('sequelize');
const sequelize = require('../../config/sequelize');

const Route = sequelize.define(
  'Route',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  { paranoid: true }
);

// (async () => {
//   await Route.sync({ alter: true });
// })();

// console.log(Route === sequelize.models.Item);

module.exports = Route;
