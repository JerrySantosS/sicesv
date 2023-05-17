const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");
const Driver = require("./driver");

const Manager = sequelize.define("Manager", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	driverId: {
		type: DataTypes.INTEGER,
		references: {
			model: Driver,
			key: "id",
		},
		comment: "This is a colum that refers to a driver",
		allowNull: true,
	},
});

Manager.belongsTo(Driver, { foreignKey: "driverId" });

// (async () => {
// 	await Manager.sync({ alter: true });
// })();
// console.log(Manager === sequelize.models.Manager);

module.exports = Manager;
