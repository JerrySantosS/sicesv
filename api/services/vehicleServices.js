const Item = require("../models/item");
const Vehicle = require("../models/vehicle");
const vehicleItemsServices = require("../services/vehicleItemsServices");
const rules = require("../rules/vehicleRules");

async function getVehicles() {
	return Vehicle.findAll()
		.then((vehicles) => {
			return vehicles;
		})
		.catch((err) => {
			throw `vehicleServices: DB Error: ${err}`;
		});
}

async function getVehicleById(id) {
	const isId = await rules.isId(id);

	if (isId) {
		return Vehicle.findOne({ where: { id: id }, include: { model: Item } })
			.then((vehicle) => {
				return vehicle;
			})
			.catch((err) => {
				throw `vehicleServices: DB Error: ${err}`;
			});
	} else {
		throw `userServehicleServices: id is not valid.`;
	}
}

async function createVehicle(data) {
	const result = await rules.createRules(data);

	if (result.paca) {
		return Vehicle.create(result)
			.then(async (vehicle) => {
				try {
					data.VehicleItems.forEach(async (vehicleItem) => {
						vehicleItem.VehicleId = vehicle.id;
					});

					await vehicleItemsServices.createManyVehicleItems(data.VehicleItems);

					return getVehicleById(vehicle.id);
				} catch (err) {
					await Vehicle.destroy({ where: { id: vehicle.id } });
					throw err;
				}
			})
			.catch((err) => {
				throw `vehicleServices: DB Error: ${err}`;
			});
	} else {
		throw `vehicleServices: ${result}`;
	}
}

async function updateVehicle(data) {
	const result = await rules.updateRules(data);

	if (result.id) {
		return Vehicle.update(result, { where: { id: result.id } })
			.then(async (vehicle) => {
				try {
					let vehicleItems = data.VehicleItems.map((item) => {
						item.VehicleId = result.id;
					});
					// Busca todos os itens cadastrados para o veículo
					let DBitems = await vehicleItemsServices.getVehicleItemsByVehicle(
						result.id
					);

					let items = compareArrays(DBitems, vehicleItems);

					if (items.itemsToAdd.length > 0) {
						await vehicleItemsServices.createManyVehicleItems(items.itemsToAdd);
						console.log(items.itemsToAdd);
					}

					if (items.itemsToDelete.length > 0) {
						await vehicleItemsServices.deleteManyVehicleItems(
							items.itemsToDelete
						);

						console.log(items.itemsToDelete);
					}
					return getVehicleById(result.id);
				} catch (err) {
					//	await Vehicle.destroy({ where: { id: vehicle.id } });
					throw err + "çlçl";
				}
			})
			.catch((err) => {
				throw `vehicleServices: DB Error: ${err}`;
			});
	} else {
		throw `userServices: ${result}`;
	}
}

async function deleteVehicle(id) {
	const isId = await rules.isId(id);

	if (isId) {
		return Vehicle.update({ active: false }, { where: { id: id } })
			.then((vehicle) => {
				return vehicle;
			})
			.catch((err) => {
				throw `vehicleServices: DB Error: ${err}`;
			});
	} else {
		throw `vehicleServices: id is not valid.`;
	}
}

// function used as a auxiliary of updateVehicle
function compareArrays(DBitems, vehicleItems) {
	let itemsToAdd = vehicleItems.filter(
		(vehicleItem) =>
			!DBitems.some((DBitem) => DBitem.ItemId === vehicleItem.ItemId)
	);
	let itemsToDelete = DBitems.filter(
		(DBitem) =>
			!vehicleItems.some((vehicleItem) => vehicleItem.ItemId === DBitem.ItemId)
	);
	return { itemsToAdd, itemsToDelete };
}

module.exports = {
	getVehicles,
	createVehicle,
	getVehicleById,
	updateVehicle,
	deleteVehicle,
};
