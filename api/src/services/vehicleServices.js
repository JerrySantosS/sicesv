const Item = require('../models/item');
const Vehicle = require('../models/vehicle');
const vehicleItemsServices = require('../services/vehicleItemsServices');
const rules = require('../rules/vehicleRules');
const { Op } = require('sequelize');

async function getAll() {
  return Vehicle.findAll({
    include: Item,
  })
    .then((vehicles) => {
      return vehicles;
    })
    .catch((err) => {
      throw `vehicleServices: DB Error: ${err}`;
    });
}

async function getInactive() {
  return Vehicle.findAll({
    where: { deletedAt: { [Op.ne]: null } },
    include: Item,
    paranoid: false,
  })
    .then((vehicles) => {
      return vehicles;
    })
    .catch((err) => {
      throw `vehicleServices: DB Error: ${err}`;
    });
}

async function getById(id) {
  const isId = await rules.isId(id);

  if (isId) {
    return Vehicle.findOne({ where: { id: id }, include: { model: Item } })
      .then((vehicle) => {
        return vehicle;
      })
      .catch((err) => {
        throw `vehicleServices: DB Error: ${err}`;
      });
  } else {
    throw `vehicleServices: id is not valid.`;
  }
}

async function create(data) {
  const result = await rules.create(data);

  if (result.paca) {
    return Vehicle.create(result)
      .then(async (vehicle) => {
        return vehicle;
        // try {
        //   data.VehicleItems.forEach(async (vehicleItem) => {
        //     vehicleItem.VehicleId = vehicle.id;
        //   });

        //   await vehicleItemsServices.createMany(data.VehicleItems);

        //   return getById(vehicle.id);
        // } catch (err) {
        //   await Vehicle.destroy({ where: { id: vehicle.id } });
        //   throw err;
        // }
      })
      .catch((err) => {
        throw `vehicleServices: DB Error: ${err}`;
      });
  } else {
    throw `vehicleServices: ${result}`;
  }
}

async function update(data) {
  const result = await rules.update(data);

  if (result.id) {
    return Vehicle.update(result, { where: { id: result.id } })
      .then(async (vehicle) => {
        return vehicle;
        // try {
        // 	let vehicleItems = data.VehicleItems.map((item) => {
        // 		item.VehicleId = result.id;
        // 		return item;
        // 	});
        // 	// Busca todos os itens cadastrados para o veículo
        // 	let DBitems = await vehicleItemsServices.getVehicleItemsByVehicle(
        // 		result.id
        // 	);

        // 	let items = compareArrays(DBitems, vehicleItems);

        // 	if (items.itemsToAdd.length > 0) {
        // 		await vehicleItemsServices.createMany(items.itemsToAdd);
        // 		console.log(items.itemsToAdd);
        // 	}

        // 	if (items.itemsToDelete.length > 0) {
        // 		await vehicleItemsServices.removeMany(items.itemsToDelete);

        // 		console.log(items.itemsToDelete);
        // 	}
        // 	return getById(result.id);
        // } catch (err) {
        // 	//	await Vehicle.destroy({ where: { id: vehicle.id } });
        // 	throw err + "çlçl";
        // }
      })
      .catch((err) => {
        throw `vehicleServices: DB Error: ${err}`;
      });
  } else {
    throw `userServices: ${result}`;
  }
}

async function restore(id) {
  const isId = await rules.isInactiveId(id);

  if (isId) {
    return Vehicle.restore({ where: { id } }).catch((err) => {
      throw `vehicleServices: DB Error: ${err}`;
    });
  } else {
    throw `vehicleServices: id is not valid.`;
  }
}

async function remove(id) {
  const isId = await rules.isId(id);

  if (isId) {
    return Vehicle.destroy({ where: { id } })
      .then((vehicle) => {
        return vehicle;
      })
      .catch((err) => {
        throw `vehicleServices: DB Error: ${err}`;
      });
  } else {
    throw `vehicleServices: id is not valid.`;
  }
}

// function used as a auxiliary of update
function compareArrays(DBitems, vehicleItems) {
  let itemsToAdd;
  let itemsToDelete;

  if (vehicleItems.length === 0) {
    itemsToAdd = [];
    itemsToDelete = DBitems;
  } else if (DBitems.length === 0) {
    itemsToAdd = vehicleItems;
    itemsToDelete = [];
  } else {
    itemsToAdd = vehicleItems.filter(
      (vehicleItem) =>
        !DBitems.some((DBitem) => DBitem.ItemId === vehicleItem.ItemId)
    );
    itemsToDelete = DBitems.filter(
      (DBitem) =>
        !vehicleItems.some(
          (vehicleItem) => vehicleItem.ItemId === DBitem.ItemId
        )
    );
  }
  return { itemsToAdd, itemsToDelete };
}

module.exports = {
  getAll,
  create,
  getById,
  update,
  remove,
  getInactive,
  restore,
};
