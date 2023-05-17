const CheckList = require("../models/checkList");
const Vehicle = require("../models/vehicle");
const VehicleItems = require("../models/vehicleItems");

async function getVehicleItemsByItem(id) {
	return await VehicleItems.findAll({ where: { ItemId: id } });
}

async function getVehicleItemsByVehicle(id) {
	return await VehicleItems.findAll({
		where: { VehicleId: id },
		include: { model: Vehicle, nested: true },
	});
}

async function createVehicleItems(data) {
	return VehicleItems.create(data)
		.then((vehicleItems) => {
			return vehicleItems;
		})
		.catch((err) => {
			throw `VehicleItems Error: DB Error: ${err}`;
		});
}

async function updateVehicleItems(data) {
	return VehicleItems.update(data)
		.then((vehicleItems) => {
			return vehicleItems;
		})
		.catch((err) => {
			throw `VehicleItems Error: DB Error: ${err}`;
		});
}

async function deleteVehicleItems(id) {
	return VehicleItems.delete({ where: { id: id } });
}

module.exports = {
	getVehicleItemsByItem,
	getVehicleItemsByVehicle,
	createVehicleItems,
	updateVehicleItems,
	deleteVehicleItems,
};
