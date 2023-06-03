const itemRules = require("../rules/itemRules");
const vehicleRules = require("../rules/vehicleRules");

async function rules(data) {
	if (await itemRules.isId(data.ItemId)) {
		if (await vehicleRules.isId(data.VehicleId)) {
			return data;
		} else {
			throw `VehicleItems Error: Vehicle does not exist`;
		}
	} else {
		throw `VehicleItems Error: Item does not exist`;
	}
}

module.exports = { rules };
