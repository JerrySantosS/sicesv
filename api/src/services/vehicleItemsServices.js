const Vehicle = require("../models/vehicle");
const VehicleItems = require("../models/vehicleItems");
const { rules } = require("../rules/vehicleItemsRules");

async function getByItem(id) {
	return await VehicleItems.findAll({ where: { ItemId: id } });
}

async function getByVehicle(id) {
	return await VehicleItems.findAll({
		where: { VehicleId: id },
	});
}

async function create(data) {
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

async function createMany(data) {
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

async function update(data) {
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

async function remove(data) {
	return VehicleItems.destroy({
		where: { VehicleId: data.VehicleId, ItemId: data.ItemId },
	});
}

async function removeMany(data) {
	for await (let vehicleItem of data) {
		VehicleItems.destroy({
			where: { VehicleId: vehicleItem.VehicleId, ItemId: vehicleItem.ItemId },
		}).catch((err) => {
			throw err;
		});
	}
}

module.exports = {
	getByItem,
	getByVehicle,
	create,
	createMany,
	update,
	remove,
	removeMany,
};
