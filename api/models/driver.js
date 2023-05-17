const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");
const User = require("./user");

const Driver = sequelize.define("Driver", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	birthDate: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	cnhNumber: {
		type: DataTypes.STRING(12),
		allowNull: false,
	},
	cnhCategory: {
		type: DataTypes.STRING(2),
		allowNull: false,
	},
	cnhValidity: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	examValidity: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	phone: {
		type: DataTypes.STRING(12),
		allowNull: true,
	},
	userId: {
		type: DataTypes.INTEGER,
		references: {
			model: User,
			key: "id",
		},
		comment: "This is a colum that refers to a user",
		allowNull: true,
	},
});

Driver.belongsTo(User, { foreignKey: "userId" });

// (async () => {
// 	await Driver.sync({ force: true });
// })();
// console.log(Driver === sequelize.models.Driver);

module.exports = Driver;
