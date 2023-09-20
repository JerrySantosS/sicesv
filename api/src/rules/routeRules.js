const Route = require('../models/route');
const generalRules = require('./generalRules');

async function isRoute(name) {
  const count = await Route.count({ where: { name } });
  return count !== 0;
}

async function isId(id) {
  const count = await Route.count({ where: { id } });
  return count !== 0;
}

async function isInactiveId(id) {
  const count = await Route.count({ where: { id }, paranoid: false });
  return count !== 0;
}

function rules({ name }) {
  let issues = [];

  if (!generalRules.stringValidate(name, 2, 50))
    issues.push('Name must be between 2 and 50 characters');

  if (issues.length > 0) {
    throw issues;
  } else {
    return { name };
  }
}

async function create({ name, ...rest }) {
  if (await isRoute(name)) {
    throw `routeRules: Route with name ${name} already exists.`;
  } else {
    return rules({ name });
  }
}

async function update({ id, name, ...rest }) {
  if (await isId(id)) {
    const result = rules({ name });

    if (result.name) {
      result.id = id;
      return result;
    } else {
      throw `routeRules: ${result}`;
    }
  } else {
    throw `routeRules: Route with id ${id} does not exist.`;
  }
}

module.exports = {
  create,
  update,
  isRoute,
  isId,
  isInactiveId,
};
