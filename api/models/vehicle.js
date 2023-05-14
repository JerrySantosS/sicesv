const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");

const Vehicle = sequelize.define("Vehicle", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	paca: {
		type: DataTypes.STRING(8),
		allowNull: false,
	},
	renavam: {
		type: DataTypes.STRING(12),
		allowNull: false,
	},
	owner: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	model: {
		type: DataTypes.STRING(35),
		allowNull: false,
	},
	manufacture_date: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	capacity: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	type: {
		type: DataTypes.STRING(25),
		allowNull: false,
	},
	body_type: {
		type: DataTypes.STRING(15),
		allowNull: false,
	},
	active: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: true,
	},
});

// (async () => {
// 	await Vehicle.sync({ alter: true });
// })();
// console.log(Vehicle === sequelize.models.Vehicle);

module.exports = Vehicle;
