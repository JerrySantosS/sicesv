const Vehicle = require("../models/vehicle");
const generalRules = require("./generalRules");

async function isVehicle(renavam) {
	const count = await Vehicle.count({ where: { renavam } });
	return count !== 0;
}

async function isId(id) {
	const count = await Vehicle.count({ where: { id } });
	return count !== 0;
}

async function isInactiveId(id) {
	const count = await Vehicle.count({ where: { id }, paranoid: false });
	return count !== 0;
}

function rules({
	paca,
	renavam,
	owner,
	model,
	manufactureDate,
	capacity,
	type,
	bodyType,
}) {
	let issues = [];
	// validatinos of paca
	if (!generalRules.stringValidate(paca, 7, 8)) {
		issues.push("Paca must be a string between 7 and 8 characters");
	}

	if (!generalRules.stringValidate(renavam, 11, 11)) {
		issues.push("RENAVAM must be a string whith 11 characters.");
	}

	if (!generalRules.stringValidate(owner, 3, 100)) {
		issues.push("Owner must be a string between 1 and 100 characters.");
	}

	if (!generalRules.stringValidate(model, 4, 35)) {
		issues.push("Model must be a string between 4 and 35 characters.");
	}

	if (!generalRules.dateValidate(manufactureDate)) {
		issues.push("Manufacture date must be a valid date.");
	}

	if (!generalRules.numberValidate(capacity)) {
		issues.push("Capacity must be a number greater then 0.");
	}

	if (!generalRules.stringValidate(type, 2, 25)) {
		issues.push("Type must be a string between 2 and 25 characters.");
	}

	if (!generalRules.stringValidate(bodyType, 3, 35)) {
		issues.push("Body type must be a string between 1 and 35 characters.");
	}

	if (issues.length > 0) {
		throw issues;
	} else {
		return {
			paca,
			renavam,
			owner,
			model,
			manufactureDate,
			capacity,
			type,
			bodyType,
		};
	}
}

async function create({
	paca,
	renavam,
	owner,
	model,
	manufactureDate,
	capacity,
	type,
	bodyType,
	...rest
}) {
	if (await isVehicle(renavam)) {
		throw `vehicleRules: Vehicle with renavam ${renavam} already exists.`;
	} else {
		return rules({
			paca,
			renavam,
			owner,
			model,
			manufactureDate,
			capacity,
			type,
			bodyType,
		});
	}
}

async function update({
	id,
	paca,
	renavam,
	owner,
	model,
	manufactureDate,
	capacity,
	type,
	bodyType,
	...rest
}) {
	if (await isId(id)) {
		const result = rules({
			paca,
			renavam,
			owner,
			model,
			manufactureDate,
			capacity,
			type,
			bodyType,
		});

		if (result.paca) {
			result.id = id;
			return result;
		} else {
			throw `vehicleRules: ${result}`;
		}
	} else {
		throw `vehicleRules: Vehicle with id ${id} does not exist.`;
	}
}

module.exports = {
	create,
	update,
	isVehicle,
	isId,
	isInactiveId,
};
