const Inspection = require('../models/inspection');
const CheckList = require('../models/checkList');
const rules = require('../rules/inspectionRules');
const checkListServices = require('./checkListServices');
const driverServices = require('./driverServices');
const vehicleServices = require('./vehicleServices');
const driverRules = require('../rules/driverRules');
const sequelize = require('../../config/sequelize');
const { QueryTypes } = require('sequelize');
const Vehicle = require('../models/vehicle');
const Item = require('../models/item');
const User = require('../models/user');
const Driver = require('../models/driver');
const Route = require('../models/route');

async function getAll() {
  return await Inspection.findAll({ include: CheckList }) //
    .catch((err) => {
      throw `inspectionServices: DB Error: ${err}`;
    });
}

async function getById(id) {
  const isId = await rules.isId(id);

  if (isId) {
    return Inspection.findOne({
      where: { id },
      include: { all: true, nested: true },
    }) // include: CheckList
      .catch((err) => {
        throw `inspectionServices: DB Error: ${err}`;
      });
  } else {
    throw `inspectionServices: id is not valid.`;
  }
}

async function getOpenInspection(id) {
  const isId = await driverRules.isId(id);

  if (isId) {
    return Inspection.findOne({
      where: { DriverId: id, entryKm: null },
      // include: CheckList,
    }).catch((err) => {
      throw `inspectionServices: DB Error: ${err}`;
    });
  } else {
    throw `inspectionServices: id is not valid.`;
  }
}

async function getTableInspection() {
  return await sequelize
    .query(
      `SELECT
      "Inspections"."id",
	"Inspections"."exitDate",
  "Inspections"."entryDate",
  "Inspections"."exitKm",
	"Inspections"."entryKm",
	("Vehicles"."paca"),
  ("Routes"."name") AS "route",
  ("Users"."name") AS "driver"
FROM
"Inspections"
INNER JOIN "Vehicles"
ON "Inspections"."VehicleId" = "Vehicles"."id"
INNER JOIN "Routes"
ON "Inspections"."RouteId" = "Routes"."id"
INNER JOIN "Drivers"
ON "Inspections"."DriverId" = "Drivers"."id"
INNER JOIN "Users"
ON "Drivers"."userId" = "Users"."id"
WHERE "Inspections"."deletedAt" IS NULL
`,
      {
        model: Inspection,
        type: QueryTypes.SELECT,
      }
    )
    .catch((err) => {
      throw `inspectionServices: DB Error: ${err}`;
    });
}

async function getViewInspection(id) {
  let result;
  return await Inspection.findOne({
    where: { id },
    include: [
      { model: CheckList },
      { model: Vehicle, include: { model: Item } },
      { model: Driver, include: { model: User } },
      { model: Route },
    ],
  }).catch((err) => {
    throw `inspectionServices: DB Error: ${err}`;
  });
}

async function create(data) {
  const result = await rules.create(data);
  if (result.DriverId) {
    return Inspection.create(result)
      .then(async (inspection) => {
        const CheckLists = data.CheckLists.map((checkList) => {
          checkList.InspectionId = inspection.id;
          return checkList;
        });

        try {
          await checkListServices.createMany(CheckLists);
          return inspection;
        } catch (err) {
          await remove(inspection);
          throw `${err}`;
        }
      })
      .catch((err) => {
        throw `Inspection Error: DB Error: ${err}`;
      });
  } else {
    throw `inspectionServices: ${result}`;
  }
}

async function update(data) {
  const result = await rules.update(data);

  if (result.DriverId) {
    return Inspection.update(result, { where: { id: result.id } })
      .then(async () => {
        // Check List Update
        const CheckLists = data.CheckLists.map((checkList) => {
          checkList.InspectionId = result.id;
          return checkList;
        });
        try {
          await checkListServices.createMany(CheckLists);
          return await getById(result.id);
        } catch (err) {
          throw `update: ${err}`;
        }
      })
      .catch((err) => {
        throw `Inspection Error: DB Error: ${err}`;
      });
  } else {
    throw `inspectionServices: ${result}`;
  }
}

async function remove(id) {
  const isId = await rules.isId(id);

  if (isId) {
    return Inspection.destroy({ where: { id } }).catch((err) => {
      throw `inspectionServices: DB Error: ${err}`;
    });
  } else {
    throw `inspectionServices: id is not valid.`;
  }
}

module.exports = {
  getAll,
  getById,
  getOpenInspection,
  getTableInspection,
  getViewInspection,
  create,
  update,
  remove,
};
