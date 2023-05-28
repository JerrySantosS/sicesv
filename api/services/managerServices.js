const Driver = require("../models/driver");
const Manager = require("../models/manager");
const rules = require("../rules/managerRules");
const driverServices = require("../services/driverServices");

async function getAll() {
	return Manager.findAll({ include: { all: true, nested: true } })
		.then((managers) => {
			return managers;
		})
		.catch((err) => {
			throw "managerServices: DB error: " + err;
		});
}

async function getById(id) {
	const isId = await rules.isId(id);

	if (isId) {
		return Manager.findOne({
			where: { id: id },
			include: { model: Driver, nested: true },
		})
			.then(async (manager) => {
				return manager;
			})
			.catch((err) => {
				throw `managerServices: DB error: ${err}`;
			});
	} else {
		throw `managerServices: id: ${id} is not valid`;
	}
}

async function create(data) {
	const newManager = rules.create(data);

	if (newManager.email) {
		const driver = await driverServices.create(data.driver);

		if (driver.id) {
			newManager.driverId = driver.id;

			return Manager.create(newManager)
				.then((manager) => {
					manager.driver = driver;
					return manager;
				})
				.catch((err) => {
					throw "managerServices: DB error: " + err;
				});
		} else {
			throw `managerServices: ${driver}`;
		}
	} else {
		throw `managerServices: ${newManager}`;
	}
}

async function update(data) {}

module.exports = {
	getAll,
	create,
	update,
	getById,
};
