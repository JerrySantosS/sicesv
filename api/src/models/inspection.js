const { DataTypes } = require('sequelize');
const sequelize = require('../../config/sequelize');
const Driver = require('./driver');
const Vehicle = require('./vehicle');
const Route = require('./route');

const Inspection = sequelize.define(
  'Inspection',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    exitDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    entryDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    exitKm: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    entryKm: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
    },
  },
  { paranoid: true }
);

// uma relação de um para muitos entre inspection e os models
// Driver, Vehicle, Route
Driver.hasOne(Inspection);
Vehicle.hasOne(Inspection);
Route.hasOne(Inspection);
Inspection.belongsTo(Driver);
Inspection.belongsTo(Vehicle);
Inspection.belongsTo(Route);

// (async () => {
//   await Inspection.sync({ force: true });
// })();
// console.log(Inspection === sequelize.models.Inspection);

module.exports = Inspection;
