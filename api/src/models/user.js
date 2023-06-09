const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");

const User = sequelize.define(
	"User",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
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
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{ paranoid: true }
);

// (async () => {
// 	await User.sync({ alter: true });
// })();

module.exports = User;
