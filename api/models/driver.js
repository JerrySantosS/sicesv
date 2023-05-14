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
	birth_date: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	cnh_number: {
		type: DataTypes.STRING(12),
		allowNull: false,
	},
	cnh_category: {
		type: DataTypes.STRING(2),
		allowNull: false,
	},
	cnh_validity: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	exam_validity: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	phone: {
		type: DataTypes.STRING(12),
		allowNull: true,
	},
	user_id: {
		type: DataTypes.INTEGER,
		references: {
			model: User,
			key: "id",
		},
		comment: "This is a colum that refers to a user",
		allowNull: true,
	},
});

Driver.belongsTo(User, { foreignKey: "user_id" });

// (async () => {
//   await Driver.sync({ alter: true });
// })();
// console.log(Driver === sequelize.models.Driver);

module.exports = Driver;
