function dateValidate(data) {
	// validations of date
	const date = new Date(data);
	if (typeof date !== "object" || date.getFullYear() < 1950) {
		false;
	} else {
		return true;
	}
}

function stringValidate(data, min, max) {
	if (typeof data !== "string" || data.length < min || data.length > max) {
		return false;
	} else {
		return true;
	}
}

function numberValidate(number) {
	if (typeof number !== "number" || number < 0) {
		return false;
	} else {
		return true;
	}
}

module.exports = {
	dateValidate,
	stringValidate,
	numberValidate,
};
