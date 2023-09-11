const Driver = require('../models/driver');
const rules = require('../rules/driverRules');
const userServices = require('./userServices');
const errorS = require('./errorServices');
const User = require('../models/user');
const Inspection = require('../models/inspection');
const { Op } = require('sequelize');

async function getAll() {
  return Driver.findAll({
    include: User,
  })
    .then((drivers) => {
      return drivers;
    })
    .catch((err) => {
      throw `DriverServices: ${err}`;
    });
}

async function getInactive() {
  return Driver.findAll({
    where: { deletedAt: { [Op.ne]: null } },
    include: { model: User, paranoid: false },
    paranoid: false,
  })
    .then((drivers) => {
      return drivers;
    })
    .catch((err) => {
      throw `DriverServices: ${err}`;
    });
}

async function getById(id) {
  const isId = await rules.isId(id);

  if (isId) {
    return Driver.findOne({ where: { id: id }, include: { model: Inspection } })
      .then((driver) => {
        return driver;
      })
      .catch((err) => {
        throw 'driverServices: ' + err;
      });
  } else {
    throw 'driverServices: ' + errorS.notId();
  }
}

async function getByUserId(id) {
  return Driver.findOne({ where: { userId: id }, include: { model: User } })
    .then((driver) => {
      return driver;
    })
    .catch((err) => {
      throw 'driverServices: ' + err;
    });
}

async function create(data) {
  const newDriver = await rules.create(data);

  if (newDriver.cnhNumber) {
    data.user.userName = newDriver.cnhNumber;
    const user = await userServices.create(data.user);
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
      throw 'driverServices: ' + user;
    }
  } else {
    throw `Error: driverServices: ${newDriver}`;
  }
}

async function update(data) {
  const driver = await rules.update(data);
  if (driver.cnhNumber) {
    const user = await userServices.update(data.user);
    if (user.id) {
      driver.userId = user.id;

      return Driver.update(driver, { where: { id: driver.id } })
        .then((res) => {
          return getById(driver.id);
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

async function restore(id) {
  try {
    const isId = await rules.isInactiveId(id);

    if (isId) {
      await Driver.restore({ where: { id } });
      const driver = await getById(id);

      await userServices.restore(driver.userId);

      return driver;
    } else {
      throw 'driverServices: ' + errorS.notId();
    }
  } catch (err) {
    throw err;
  }
}

async function remove(id) {
  const isId = await rules.isId(id);

  if (isId) {
    return Driver.findOne({ where: { id: id } })
      .then(async (driver) => {
        try {
          await userServices.remove(driver.userId);
          await Driver.destroy({ where: { id: driver.id } });
          return driver;
        } catch (err) {
          throw `driverServices: remove: ${err}`;
        }
      })
      .catch((err) => {
        throw 'DriverServices.deleteUser: DB error: ' + err;
      });
  } else {
    throw 'driverServices: ' + errorS.notId();
  }
}

module.exports = {
  create,
  getAll,
  getById,
  getByUserId,
  update,
  remove,
  getInactive,
  restore,
};
