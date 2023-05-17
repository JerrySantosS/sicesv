const Driver = require("../models/driver");

async function isDriver(cnhNumber) {
	const count = await Driver.count({ where: { cnhNumber } });
	return count !== 0;
}

async function isId(id) {
	const count = await Driver.count({ where: { id } });
	return count !== 0;
}

function nameValidate(name) {
	// validations of name
	if (typeof name !== "string" || name.length < 2 || name.length > 255) {
		return "Name must be a string with between 2 and 255 characters.";
	}

	return null;
}

function dateValidate(dateValue, info) {
	// validations of date
	let date = new Date(dateValue);
	if (typeof date !== "object") {
		return `${info} must be a valid date.`;
	}

	return null;
}

function cnhNumberAndPhoneValidate(number, info) {
	if (typeof number != "string") {
		return `${info} number must be a string.`;
	} else if (number.length != 11) {
		return `${info} number must be 11 digits long.`;
	} else if (!parseFloat(number)) {
		return `${info} number must have only numbers.`;
	} else {
		return null;
	}
}

function cnhCategoryValidate(cnhCategory) {
	if (typeof cnhCategory != "string") {
		return "CNH category must be a string.";
	} else if (cnhCategory.length < 1 || cnhCategory.length > 3) {
		return "CNH category must be between 1 and 3 characters.";
	} else {
		return null;
	}
}

function rules({
	name,
	birthDate,
	cnhNumber,
	cnhCategory,
	cnhValidity,
	examValidity,
	phone,
	...rest
}) {
	let issues = [];
	// validation of name
	if (nameValidate(name)) issues.push(nameValidate(name));

	// validations of birth date
	if (dateValidate(birthDate))
		issues.push(dateValidate(birthDate, "Data de nascimento"));

	// validations of cnh number
	if (cnhNumberAndPhoneValidate(cnhNumber, "CNH"))
		issues.push(cnhNumberAndPhoneValidate(cnhNumber, "CNH"));

	// validations of cnh category
	if (cnhCategoryValidate(cnhCategory))
		issues.push(cnhCategoryValidate(cnhCategory));

	// validations of cnh validity
	if (dateValidate(cnhValidity))
		issues.push(dateValidate(cnhValidity, "Validade da CNH"));

	// validations of exam validity
	if (dateValidate(examValidity))
		issues.push(dateValidate(examValidity, "Exame Toxicológico"));

	// validations of phone
	if (cnhNumberAndPhoneValidate(phone, "Phone"))
		issues.push(cnhNumberAndPhoneValidate(phone, "Phone"));

	if (issues.length > 0) {
		throw issues;
	} else {
		return {
			name,
			birthDate,
			cnhNumber,
			cnhCategory,
			cnhValidity,
			examValidity,
			phone,
		};
	}
}

async function createRules({
	name,
	birthDate,
	cnhNumber,
	cnhCategory,
	cnhValidity,
	examValidity,
	phone,
	...rest
}) {
	if (await isDriver(cnhNumber)) {
		throw `DriverRules: Driver with CNH number: ${cnhNumber} already exists. Please, try other.`;
	} else {
		return rules({
			name,
			birthDate,
			cnhNumber,
			cnhCategory,
			cnhValidity,
			examValidity,
			phone,
		});
	}
}

async function updateRules({
	name,
	birthDate,
	cnhNumber,
	cnhCategory,
	cnhValidity,
	examValidity,
	phone,
	id,
	...rest
}) {
	if (await isId(id)) {
		const result = rules({
			name,
			birthDate,
			cnhNumber,
			cnhCategory,
			cnhValidity,
			examValidity,
			phone,
		});

		if (result.name) {
			result.id = id;
			return result;
		} else {
			throw `DriverRules: ${result}`;
		}
	} else {
		throw `DriverRules: Driver with id ${id} does not exist.`;
	}
}

module.exports = {
	createRules,
	updateRules,
	isDriver,
	isId,
};
