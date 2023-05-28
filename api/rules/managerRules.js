const Manager = require("../models/manager");

async function isId(id) {
	const count = await Manager.count({ where: { id } });
	return count !== 0;
}

function rules(email) {
	if (
		typeof email !== "string" ||
		email.length === 0 ||
		email.indexOf("@") == -1 ||
		email.indexOf(".") == -1
	) {
		throw "managerRules: Email is not valid";
	} else {
		return { email: email };
	}
}

function create({ email, ...rest }) {
	return rules(email);
}

async function update({ id, email, ...rest }) {
	if (await isId(id)) {
		const result = rules(email);

		if (result.email) {
			result.id = id;
			return result;
		} else {
			throw `managerRules: ${result} `;
		}
	} else {
		throw `managerRules: ${id} is not valid`;
	}
}

module.exports = {
	create,
	update,
	isId,
};
