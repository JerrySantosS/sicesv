const CheckList = require("../models/checkList");
const rules = require("../rules/checkListRules");

async function getAll() {
	return CheckList.getAll().catch((err) => {
		throw `checkListSerices: DB Error: ${err}`;
	});
}

async function getByInspection(id) {
	if (isId(id)) {
		return await CheckList.findAll({ where: { InspectionId: id } }).catch(
			(err) => {
				throw `checkListSerices: DB Error: ${err}`;
			}
		);
	} else {
		throw `checkListSerices: InspectionId is not valid`;
	}
}

async function create(data) {
	const result = await rules.create(data);

	if (result.type) {
		return CheckList.create(result).catch((err) => {
			throw `checkListSerices: DB Error: ${err}`;
		});
	} else {
		throw `checkListSerices: ${result}`;
	}
}

async function createMany(data) {
	let checkLists = [];

	for await (let checkList of data) {
		const result = await rules.create(checkList);

		if (result.type) {
			checkLists.push(result);
		} else {
			throw `checkListSerices: createMany: ${result}`;
		}
	}

	CheckList.bulkCreate(checkLists).catch((err) => {
		throw `checkListServices: DB Error: ${err}`;
	});
}

async function update(data) {
	const result = await rules.update(data);

	if (result.type) {
		return CheckList.update(result, { where: { id: result.id } }).catch(
			(err) => {
				throw `checkListSerices: DB Error: ${err}`;
			}
		);
	} else {
		throw `checkListSerices: ${result}`;
	}
}

async function updateMany(data) {
	if (data.length > 0) {
		let checkLists = [];
		for await (let checkList of data) {
			const result = await rules.update(checkList);

			if (!result.type) {
				throw `checkListSerices: ${result}`;
			} else {
				checkLists.push(result);
			}
		}

		for await (let checkList of checkLists) {
			CheckList.update(checkList, {
				where: {
					InspectionId: checkList.InspectionId,
					ItemId: checkList.ItemId,
				},
			}).catch((err) => {
				throw `checkListSerices: DB Error: ${err}`;
			});
		}
	}
}

async function remove(data) {
	return CheckList.destroy({
		where: { InspectionId: data.InspectionId, ItemId: data.ItemId },
	}).catch((err) => {
		throw `checkListSerices: DB Error: ${err}`;
	});
}

module.exports = {
	getAll,
	getByInspection,
	create,
	createMany,
	update,
	updateMany,
};
