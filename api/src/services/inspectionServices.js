const Inspection = require("../models/inspection");
const CheckList = require("../models/checkList");
const rules = require("../rules/inspectionRules");
const checkListServices = require("../services/checkListServices");

async function getAll() {
	return await Inspection.findAll({ include: CheckList }) //
		.catch((err) => {
			throw `inspectionServices: DB Error: ${err}`;
		});
}

async function getById(id) {
	const isId = await rules.isId(id);

	if (isId) {
		return Inspection.findOne({ where: { id } }) // include: CheckList
			.catch((err) => {
				throw `inspectionServices: DB Error: ${err}`;
			});
	} else {
		throw `inspectionServices: id is not valid.`;
	}
}

async function create(data) {
	const result = await rules.create(data);
	if (result.DriverId) {
		return Inspection.create(result)
			.then(async (inspection) => {
				const CheckLists = data.CheckLists.map((checkList) => {
					checkList.InspectionId = inspection.id;
					return checkList;
				});

				try {
					await checkListServices.createMany(CheckLists);
					return inspection;
				} catch (err) {
					throw `${err}`;
				}
			})
			.catch((err) => {
				throw `Inspection Error: DB Error: ${err}`;
			});
	} else {
		throw `inspectionServices: ${result}`;
	}
}

async function update(data) {
	const result = await rules.update(data);

	if (result.DriverId) {
		return Inspection.update(result, { where: { id: result.id } })
			.then(async () => {
				// Check List Update
				// 	try {
				// 		await checkListServices.updateMany(data.CheckLists);
				// 		return getById(result.id);
				// 	} catch (err) {
				// 		throw `update: ${err}`;
				// 	}
			})
			.catch((err) => {
				throw `Inspection Error: DB Error: ${err}`;
			});
	} else {
		throw `inspectionServices: ${result}`;
	}
}

async function remove(id) {
	const isId = await rules.isId(id);

	if (isId) {
		return Inspection.destroy({ where: { id } }).catch((err) => {
			throw `inspectionServices: DB Error: ${err}`;
		});
	} else {
		throw `inspectionServices: id is not valid.`;
	}
}

module.exports = {
	getAll,
	getById,
	create,
	update,
	remove,
};
