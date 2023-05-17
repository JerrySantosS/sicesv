const Driver = require("../models/driver");
const rules = require("../rules/driverRules");
const userServices = require("./userServices");
const errorS = require("./errorServices");
const User = require("../models/user");
const Inspection = require("../models/inspection");

async function getDrivers() {
	return Driver.findAll({ include: User })
		.then((drivers) => {
			return drivers;
		})
		.catch((err) => {
			throw `DriverServices: ${err}`;
		});
}

async function getDriverById(id) {
	const isId = await rules.isId(id);

	if (isId) {
		return Driver.findOne({ where: { id: id }, include: { model: Inspection } })
			.then((driver) => {
				return driver;
			})
			.catch((err) => {
				throw "driverServices: " + err;
			});
	} else {
		throw "driverServices: " + errorS.notId();
	}
}

async function createDriver(data) {
	const newDriver = await rules.createRules(data);

	if (newDriver.name) {
		data.user.userName = newDriver.cnhNumber;
		const user = await userServices.createUser(data.user);
		if (user.id) {
			newDriver.userId = user.id;

			return Driver.create(newDriver)
				.then((driver) => {
					return driver;
				})
				.catch((err) => {
					throw `Erro: Não foi possível criar motorista ${err}`;
				});
		} else {
			throw "driverServices: " + driver;
		}
	} else {
		throw `Error: driverServices: ${driver}`;
	}
}

async function updateDriver(data) {
	const driver = await rules.updateRules(data);

	if (driver.name) {
		const user = await userServices.updateUser(data.user);

		if (user.id) {
			driver.userId = user.id;

			return Driver.update(driver, { where: { id: driver.id } })
				.then((driver) => {
					return driver;
				})
				.catch((err) => {
					`driverServices DB error: ${err}`;
				});
		} else {
			throw `driverServices: ${user}`;
		}
	} else {
		throw `driverServices error: ${driver}`;
	}
}

async function deleteDriver(id) {
	const isId = await rules.isId(id);

	if (isId) {
		return Driver.findOne({ where: { id: id } })
			.then((driver) => {
				return userServices.deleteUser(driver.userId);
			})
			.catch((err) => {
				throw "DriverServices.deleteUser: DB error: " + err;
			});
	} else {
		throw "driverServices: " + errorS.notId();
	}
}

module.exports = {
	createDriver,
	getDrivers,
	getDriverById,
	updateDriver,
	deleteDriver,
};
