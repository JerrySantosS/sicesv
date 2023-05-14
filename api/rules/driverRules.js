const Driver = require("../models/driver");

async function isDriver(cnh_number) {
	const count = await Driver.count({ where: { cnh_number } });
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

function cnhCategoryValidate(cnh_category) {
	if (typeof cnh_category != "string") {
		return "CNH category must be a string.";
	} else if (cnh_category.length < 1 || cnh_category.length > 3) {
		return "CNH category must be between 1 and 3 characters.";
	} else {
		return null;
	}
}

function rules({
	name,
	birth_date,
	cnh_number,
	cnh_category,
	cnh_validity,
	exam_validity,
	phone,
	...rest
}) {
	let issues = [];
	// validation of name
	if (nameValidate(name)) issues.push(nameValidate(name));

	// validations of birth date
	if (dateValidate(birth_date))
		issues.push(dateValidate(birth_date, "Data de nascimento"));

	// validations of cnh number
	if (cnhNumberAndPhoneValidate(cnh_number, "CNH"))
		issues.push(cnhNumberAndPhoneValidate(cnh_number, "CNH"));

	// validations of cnh category
	if (cnhCategoryValidate(cnh_category))
		issues.push(cnhCategoryValidate(cnh_category));

	// validations of cnh validity
	if (dateValidate(cnh_validity))
		issues.push(dateValidate(cnh_validity, "Validade da CNH"));

	// validations of exam validity
	if (dateValidate(exam_validity))
		issues.push(dateValidate(exam_validity, "Exame Toxicológico"));

	// validations of phone
	if (cnhNumberAndPhoneValidate(phone, "Phone"))
		issues.push(cnhNumberAndPhoneValidate(phone, "Phone"));

	if (issues.length > 0) {
		throw issues;
	} else {
		return {
			name,
			birth_date,
			cnh_number,
			cnh_category,
			cnh_validity,
			exam_validity,
			phone,
		};
	}
}

async function createRules({
	name,
	birth_date,
	cnh_number,
	cnh_category,
	cnh_validity,
	exam_validity,
	phone,
	...rest
}) {
	if (await isDriver(cnh_number)) {
		throw `DriverRules: Driver with CNH number: ${cnh_number} already exists. Please, try other.`;
	} else {
		return rules({
			name,
			birth_date,
			cnh_number,
			cnh_category,
			cnh_validity,
			exam_validity,
			phone,
		});
	}
}

async function updateRules({
	name,
	birth_date,
	cnh_number,
	cnh_category,
	cnh_validity,
	exam_validity,
	phone,
	id,
	...rest
}) {
	if (await isId(id)) {
		const result = rules({
			name,
			birth_date,
			cnh_number,
			cnh_category,
			cnh_validity,
			exam_validity,
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
