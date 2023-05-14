const User = require("../models/user");
const rules = require("../rules/userRules");
const errorS = require("./errorServices");

async function getUsers() {
	return User.findAll()
		.then((users) => {
			return users;
		})
		.catch((err) => {
			throw "userServices: " + err;
		});
}

async function getUserById(id) {
	const isId = await rules.isId(id);

	if (isId) {
		return User.findByPk(id)
			.then((user) => {
				return user;
			})
			.catch((err) => {
				throw "userServices: " + err;
			});
	} else {
		throw "userServices: " + errorS.notId();
	}
}

async function createUser(data) {
	const result = await rules.createRules(data);

	if (result.user_name) {
		return User.create(result)
			.then((user) => {
				return user;
			})
			.catch((err) => {
				throw "UserServices: " + err;
			});
	} else {
		throw "userServices: " + result;
	}
}

async function updateUser(data) {
	const result = await rules.updateRules(data);

	if (result.user_name) {
		return User.update(result, { where: { id: result.id } })
			.then((user) => {
				return user;
			})
			.catch((err) => {
				throw "UserServices:" + err;
			});
	} else {
		throw "userServices: " + result;
	}
}

async function deleteUser(id) {
	const isId = await rules.isId(id);

	if (isId) {
		return User.update({ active: false }, { where: { id: id } })
			.then((user) => {
				return user;
			})
			.catch((err) => {
				throw "UserServices.deleteUser: DB error: " + err;
			});
	} else {
		throw "UserServices: " + errorS.notId();
	}
}

module.exports = {
	createUser,
	getUsers,
	getUserById,
	updateUser,
	deleteUser,
};
