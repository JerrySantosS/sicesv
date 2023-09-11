const Driver = require('../models/driver');
const Manager = require('../models/manager');
const User = require('../models/user');
const rules = require('../rules/managerRules');
const driverServices = require('../services/driverServices');
const { Op } = require('sequelize');

async function getAll() {
  return Manager.findAll({
    include: {
      model: Driver,
      include: {
        model: User,
      },
    },
  })
    .then((managers) => {
      return managers;
    })
    .catch((err) => {
      throw 'managerServices: DB error: ' + err;
    });
}

async function getInactive() {
  return Manager.findAll({
    where: { deletedAt: { [Op.ne]: null } },
    include: {
      model: Driver,
      paranoid: false,
      include: {
        model: User,
        paranoid: false,
      },
    },
    paranoid: false,
  })
    .then((managers) => {
      return managers;
    })
    .catch((err) => {
      throw 'managerServices: DB error: ' + err;
    });
}

async function getById(id) {
  const isId = await rules.isId(id);

  if (isId) {
    return Manager.findOne({
      where: { id: id },
      include: {
        model: Driver,
        include: {
          model: User,
        },
      },
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

async function getByUserId(id) {
  const driver = await driverServices.getByUserId(id);
  if (driver.id) {
    return Manager.findOne({
      where: { driverId: driver.id },
      include: {
        model: Driver,
        include: {
          model: User,
        },
      },
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
          throw 'managerServices: DB error: ' + err;
        });
    } else {
      throw `managerServices: ${driver}`;
    }
  } else {
    throw `managerServices: ${newManager}`;
  }
}

async function update(data) {
  const manager = await rules.update(data);

  if (manager.id) {
    const driver = await driverServices.update(data.driver);

    if (driver.id) {
      manager.driverId = driver.id;
      return Manager.update(manager, { where: { id: manager.id } })
        .then((result) => {
          return getById(manager.id);
        })
        .catch((err) => {
          throw `managerServices: DB error: ${err}`;
        });
    } else {
      throw `managerServices: ${driver}`;
    }
  } else {
    throw `managerServices: ${manager}`;
  }
}

async function restore(id) {
  try {
    const isId = await rules.isInactiveId(id);

    if (isId) {
      await Manager.restore({ where: { id } });

      const manager = await getById(id);

      await driverServices.restore(manager.driverId);

      return manager;
    } else {
      throw `managerServices: restore: id is not valid`;
    }
  } catch (err) {
    throw `managerServices: ${err}`;
  }
}

async function remove(id) {
  const isId = await rules.isId(id);

  if (isId) {
    return Manager.findOne({ where: { id } })
      .then(async (manager) => {
        try {
          await driverServices.remove(manager.driverId);
          await Manager.destroy({ where: { id } });
          return manager;
        } catch (err) {
          throw `managerServices: ${err}`;
        }
      })
      .catch((err) => {
        throw `managerServices: DB error: ${err}`;
      });
  } else {
    throw `managerServices: remove: id is not valid`;
  }
}

module.exports = {
  getAll,
  getById,
  getByUserId,
  getInactive,
  create,
  update,
  getById,
  remove,
  restore,
};
