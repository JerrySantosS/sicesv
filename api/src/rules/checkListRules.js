const CheckList = require("../models/checkList");
const inspectionRules = require("../rules/inspectionRules");
const itemRules = require("../rules/itemRules");

async function isId(id) {
	const count = await CheckList.count({ where: { id } });
	return count !== 0;
}

async function rules({ status, type, InspectionId, ItemId }) {
	let issues = [];
	if (typeof type !== "number" || type < 1 || type > 2)
		issues.push("type must be a number between 1 and 2");

	if (typeof status !== "boolean") issues.push("status must be a boolean");

	if (!inspectionRules.isId(InspectionId))
		issues.push("inspectionId is not valid");

	if (!itemRules.isId(ItemId)) issues.push("itemId is not valid");

	if (issues.length > 0) {
		throw `checkListRules: ${issues}`;
	} else {
		return {
			status,
			type,
			InspectionId,
			ItemId,
		};
	}
}
async function create({ status, type, InspectionId, ItemId, ...rest }) {
	return rules({ status, type, InspectionId, ItemId });
}

async function update({ id, status, type, InspectionId, ItemId, ...rest }) {
	if (isId(id)) {
		const result = rules({ status, type, InspectionId, ItemId });

		if (result.type) {
			result.id = id;
			return result;
		} else {
			throw `checkListRules: id is not valid`;
		}
	}
}

module.exports = {
	isId,
	create,
	update,
};
