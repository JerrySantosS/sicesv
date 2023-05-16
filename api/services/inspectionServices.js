const Inspection = require("../models/inspection");
const CheckList = require("../models/checkList");
const VehicleItems = require("../models/vehicleItems");

async function getInspections() {
	return await Inspection.findAll();
}

async function getInspectionById(id) {
	return await Inspection.findByPk(id);
}

async function createInspection(data) {
	return Inspection.create(data)
		.then((inspection) => {
			return Inspection;
		})
		.catch((err) => {
			throw `Inspection Error: DB Error: ${err}`;
		});
}

async function updateInspection(data) {
	return Inspection.update(data)
		.then((inspection) => {
			return Inspection;
		})
		.catch((err) => {
			throw `Inspection Error: DB Error: ${err}`;
		});
}

async function deleteInspection(id) {
	return Inspection.delete({ where: { id: id } });
}

module.exports = {
	getInspections,
	getInspectionById,
	createInspection,
	updateInspection,
	deleteInspection,
};
