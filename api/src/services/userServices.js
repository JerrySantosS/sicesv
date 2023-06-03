const User = require("../models/user");
const rules = require("../rules/userRules");
const errorS = require("./errorServices");
const { Op } = require("sequelize");

async function getAll() {
	return User.findAll()
		.then((users) => {
			return users;
		})
		.catch((err) => {
			throw "userServices: " + err;
		});
}

async function getInactive() {
	return User.findAll({
		where: { deletedAt: { [Op.ne]: null } },
		paranoid: false,
	})
		.then((users) => {
			return users;
		})
		.catch((err) => {
			throw `userServices: ${err}`;
		});
}

async function getById(id) {
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

async function create(data) {
	const result = await rules.create(data);

	if (result.userName) {
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

async function update(data) {
	const result = await rules.update(data);

	if (result.userName) {
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

async function restore(id) {
	const isId = await rules.isInactiveId(id);

	if (isId) {
		return User.restore({ where: { id } }).catch((err) => {
			throw "UserServices.remove: DB error: " + err;
		});
	} else {
		throw "UserServices: " + errorS.notId();
	}
}

async function remove(id) {
	const isId = await rules.isId(id);

	if (isId) {
		return User.destroy({ where: { id } })
			.then((user) => {
				return user;
			})
			.catch((err) => {
				throw "UserServices.remove: DB error: " + err;
			});
	} else {
		throw "UserServices: " + errorS.notId();
	}
}

module.exports = {
	create,
	getAll,
	getInactive,
	getById,
	update,
	restore,
	remove,
};
