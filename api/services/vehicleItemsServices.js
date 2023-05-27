const Vehicle = require("../models/vehicle");
const VehicleItems = require("../models/vehicleItems");
const { rules } = require("../rules/vehicleItemsRules");

async function getVehicleItemsByItem(id) {
	return await VehicleItems.findAll({ where: { ItemId: id } });
}

async function getVehicleItemsByVehicle(id) {
	return await VehicleItems.findAll({
		where: { VehicleId: id },
	});
}

async function createVehicleItems(data) {
	const vehicleItems = await rules(data);

	if (vehicleItems.VehicleId) {
		return VehicleItems.create(data)
			.then((vehicleItems) => {
				return vehicleItems;
			})
			.catch((err) => {
				throw `VehicleItems Error: DB Error: ${err}`;
			});
	} else {
		throw "dfdfd";
	}
}

async function createManyVehicleItems(data) {
	for await (let vehicleItem of data) {
		try {
			await rules(vehicleItem);

			VehicleItems.create(vehicleItem).catch((err) => {
				throw `VehicleItems Error: DB Error: ${err}`;
			});
		} catch (err) {
			throw err + "VehicleItems Error: DB Error:";
		}
	}
}

async function updateVehicleItems(data) {
	// for await (let vehicleItem of data) {
	// 	try {
	// 		await rules(vehicleItem);
	// 		VehicleItems.update({ where: { VehcleId: vehicleItem.VehicleId } }).catch(
	// 			(err) => {
	// 				throw `VehicleItems Error: DB Error: ${err}`;
	// 			}
	// 		);
	// 	} catch (err) {}
	// }
}

async function deleteVehicleItems(data) {
	return VehicleItems.destroy({
		where: { VehicleId: data.VehicleId, ItemId: data.ItemId },
	});
}

async function deleteManyVehicleItems(data) {
	for await (let vehicleItem of data) {
		VehicleItems.destroy({
			where: { VehicleId: vehicleItem.VehicleId, ItemId: vehicleItem.ItemId },
		}).catch((err) => {
			throw err;
		});
	}
}

module.exports = {
	getVehicleItemsByItem,
	getVehicleItemsByVehicle,
	createVehicleItems,
	createManyVehicleItems,
	updateVehicleItems,
	deleteVehicleItems,
	deleteManyVehicleItems,
};
