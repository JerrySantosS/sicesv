const Inspection = require('../models/inspection');
const generalRules = require('./generalRules');
const driverRules = require('../rules/driverRules');
const vehicleRules = require('../rules/vehicleRules');
const routeRules = require('../rules/routeRules');

async function isId(id) {
  const count = await Inspection.count({ where: { id } });
  return count !== 0;
}

function rules({
  exitDate,
  entryDate,
  exitKm,
  entryKm,
  RouteId,
  DriverId,
  VehicleId,
  comment,
  checkLists,
  ...rest
}) {
  let issues = [];

  if (entryDate) {
    if (!generalRules.dateValidate(entryDate)) {
      issues.push('entry date must be a valid date.');
    }
  }

  if (!generalRules.dateValidate(exitDate)) {
    issues.push('exit date must be a valid date.');
  }

  if (!generalRules.numberValidate(exitKm)) {
    issues.push('Exit Km must be a number greater then 0.');
  }

  if (entryKm) {
    if (!generalRules.numberValidate(entryKm)) {
      issues.push('Entry Km must be a number greater then 0.');
    }
  }

  if (!generalRules.stringValidate(comment, 0, 150)) {
    issues.push('Route must be a string between 2 and 255 characters.');
  }

  if (!routeRules.isId(RouteId))
    issues.push(`route with id ${id} does not exist.`);

  if (!driverRules.isId(DriverId))
    issues.push(`driver with id ${id} does not exist.`);

  if (!vehicleRules.isId(VehicleId))
    issues.push(`vehicle with id ${id} does not exist.`);

  if (issues.length > 0) {
    throw issues;
  } else {
    return {
      exitDate,
      entryDate,
      exitKm,
      entryKm,
      RouteId,
      DriverId,
      VehicleId,
      comment,
    };
  }
}

async function create({
  exitDate,
  entryDate,
  exitKm,
  entryKm,
  RouteId,
  DriverId,
  VehicleId,
  comment,
  ...rest
}) {
  return rules({
    exitDate,
    entryDate,
    exitKm,
    entryKm,
    RouteId,
    DriverId,
    VehicleId,
    comment,
  });
}

async function update({
  id,
  exitDate,
  entryDate,
  exitKm,
  entryKm,
  RouteId,
  DriverId,
  VehicleId,
  comment,
  ...rest
}) {
  if (await isId(id)) {
    const result = rules({
      exitDate,
      entryDate,
      exitKm,
      entryKm,
      RouteId,
      DriverId,
      VehicleId,
      comment,
    });

    if (result.RouteId) {
      result.id = id;
      return result;
    } else {
      throw `inspectionRules: ${result}`;
    }
  } else {
    throw `inspectionRules: Inspection with id ${id} does not exist.`;
  }
}

module.exports = {
  create,
  update,
  isId,
};
