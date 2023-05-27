const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");
const Vehicle = require("./vehicle");
const Item = require("./item");

const VehicleItems = sequelize.define("VehicleItems", {}, { paranoid: true });

Vehicle.belongsToMany(Item, { through: VehicleItems });
Item.belongsToMany(Vehicle, { through: VehicleItems });

// (async () => {
// 	await VehicleItems.sync({ alter: true });
// })();
// console.log(VehicleItems === sequelize.models.VehicleItems);

module.exports = VehicleItems;
