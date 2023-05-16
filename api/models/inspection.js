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
	exit_date: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	entry_date: {
		type: DataTypes.DATE,
		allowNull: true,
	},
	exit_km: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	entry_km: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},
	route: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	driver_id: {
		type: DataTypes.INTEGER,
		references: {
			model: Driver,
			key: "id",
		},
	},
	vehicle_id: {
		type: DataTypes.INTEGER,
		references: {
			model: Vehicle,
			key: "id",
		},
	},
});

Inspection.belongsTo(Driver, { foreignKey: "driver_id" });
Inspection.belongsTo(Vehicle, { foreignKey: "vehicle_id" });

// (async () => {
// 	await Inspection.sync({ force: true });
// })();
// console.log(Inspection === sequelize.models.Inspection);

module.exports = Inspection;
