const Vehicle = require('../models/vehicle');
const VehicleItems = require('../models/vehicleItems');
const { rules } = require('../rules/vehicleItemsRules');
const { Op } = require('sequelize');

async function getByItem(id) {
  return await VehicleItems.findAll({ where: { ItemId: id } });
}

async function getByVehicle(id) {
  return await VehicleItems.findAll({
    where: { VehicleId: id },
  });
}

async function getByVehicleItem(vehicleItem) {
  return await VehicleItems.findOne({
    where: { ItemId: vehicleItem.ItemId, VehicleId: vehicleItem.VehicleId },
    paranoid: false,
  });
}

async function create(data) {
  const vehicleItems = await rules(data);

  if (vehicleItems.VehicleId) {
    return VehicleItems.create(data)
      .then((vehicleItems) => {
        return vehicleItems;
      })
      .catch((err) => {
        throw `VehicleItems Error: DB Error: ${err}`;
      });
  } else {
    throw 'dfdfd';
  }
}

async function createMany(data) {
  for await (let vehicleItem of data) {
    try {
      const result = await rules(vehicleItem);

      if (result.ItemId) {
        const exist = await getByVehicleItem(vehicleItem);
        if (exist && exist.ItemId) {
          VehicleItems.restore({
            where: {
              ItemId: vehicleItem.ItemId,
              VehicleId: vehicleItem.VehicleId,
            },
          }).catch((err) => {
            throw `vehicleItemsServices: DB Error1: ${err}`;
          });
        } else {
          VehicleItems.create(vehicleItem).catch((err) => {
            throw `VehicleItems Error: DB Error2: ${err}`;
          });
        }
      } else {
        throw `DB Error3: ${result}`;
      }
    } catch (err) {
      throw err + 'VehicleItems Error: DB Error4:';
    }
  }
}

async function update(data) {
  for await (let vehicleItem of data) {
    try {
      await rules(vehicleItem);
      VehicleItems.update({ where: { VehcleId: vehicleItem.VehicleId } }).catch(
        (err) => {
          throw `VehicleItems Error: DB Error: ${err}`;
        }
      );
    } catch (err) {}
  }
}

async function remove(data) {
  return VehicleItems.destroy({
    where: { VehicleId: data.VehicleId, ItemId: data.ItemId },
  });
}

async function removeMany(data) {
  for await (let vehicleItem of data) {
    VehicleItems.destroy({
      where: { VehicleId: vehicleItem.VehicleId, ItemId: vehicleItem.ItemId },
    }).catch((err) => {
      throw err;
    });
  }
}

module.exports = {
  getByItem,
  getByVehicle,
  getByVehicleItem,
  create,
  createMany,
  update,
  remove,
  removeMany,
};
