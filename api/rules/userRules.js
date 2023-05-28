const User = require("../models/user");

async function isUser(userName) {
	const count = await User.count({ where: { userName } });
	return count !== 0;
}

async function isId(id) {
	const count = await User.count({ where: { id } });
	return count !== 0;
}

async function isInactiveId(id) {
	const count = await User.count({ where: { id }, paranoid: false });
	return count !== 0;
}

function rules({ userName, password, type, ...rest }) {
	let issues = [];

	if (
		typeof userName !== "string" ||
		userName.length < 2 ||
		userName.length > 13
	) {
		issues.push("Name must be a string with between 2 and 13 characters.");
	}
	if (typeof password !== "string" || password.length < 4) {
		issues.push("Password must be a string with at least 4 characters.");
	}
	if (typeof type !== "number" || type < 1 || type > 4) {
		issues.push("Type must be an integer between 1 and 4.");
	}

	if (issues.length > 0) {
		throw issues;
	} else {
		return { userName, password, type };
	}
}

async function create({ userName, password, type, ...rest }) {
	if (await isUser(userName)) {
		throw `userRules: User with name ${userName} already exists.`;
	} else {
		return rules({ userName, password, type });
	}
}

async function update({ id, userName, password, type, ...rest }) {
	if (await isId(id)) {
		const result = rules({ userName, password, type, ...rest });

		if (result.userName) {
			result.id = id;
			return result;
		} else {
			throw `userRules: ${result}`;
		}
	} else {
		throw `userRules: User with id ${id} does not exist.`;
	}
}

module.exports = {
	create,
	update,
	isUser,
	isId,
	isInactiveId,
};
