const Inspection = require("../models/inspection");
const CheckList = require("../models/checkList");
const VehicleItems = require("../models/vehicleItems");

async function getAll() {
	return await Inspection.findAll();
}

async function getById(id) {
	return await Inspection.findByPk(id);
}

async function create(data) {
	return Inspection.create(data)
		.then((inspection) => {
			return inspection;
		})
		.catch((err) => {
			throw `Inspection Error: DB Error: ${err}`;
		});
}

async function update(data) {
	return Inspection.update(data)
		.then((inspection) => {
			return inspection;
		})
		.catch((err) => {
			throw `Inspection Error: DB Error: ${err}`;
		});
}

async function remove(id) {
	return Inspection.destroy({ where: { id: id } });
}

module.exports = {
	getAll,
	getById,
	create,
	update,
	remove,
};
