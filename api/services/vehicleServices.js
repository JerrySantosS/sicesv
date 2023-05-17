const Item = require("../models/item");
const Vehicle = require("../models/vehicle");
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
			.then((vehicle) => {
				return vehicle;
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
			.then((vehicle) => {
				return vehicle;
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

module.exports = {
	getVehicles,
	createVehicle,
	getVehicleById,
	updateVehicle,
	deleteVehicle,
};
