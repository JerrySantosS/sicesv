const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");
const Inspection = require("./inspection");
const Item = require("./item");

const CheckList = sequelize.define("CheckList", {
	status: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
	type: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
});

Inspection.belongsToMany(Item, { through: CheckList, unique: false });
Item.belongsToMany(Inspection, { through: CheckList, unique: false });

// (async () => {
// 	await CheckList.sync({ force: true });
// })();
// console.log(CheckList === sequelize.models.CheckList);

module.exports = CheckList;
