const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");
const Driver = require("./driver");
const Vehicle = require("./vehicle");

const Inspection = sequelize.define("Inspection", {
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
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	entryKm: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},
	route: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

Driver.hasOne(Inspection);
Vehicle.hasOne(Inspection);
Inspection.belongsTo(Driver);
Inspection.belongsTo(Vehicle);

// (async () => {
// 	await Inspection.sync({ alter: true });
// })();
// console.log(Inspection === sequelize.models.Inspection);

module.exports = Inspection;
