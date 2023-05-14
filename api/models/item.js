const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");

const Item = sequelize.define("Item", {
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
	type: {
		// The types will be integers. 1: essential; 2: important; 3: No Risks
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	active: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: true,
	},
});

// (async () => {
// 	await Item.sync({ alter: true });
// })();
// console.log(Item === sequelize.models.Item);

module.exports = Item;
