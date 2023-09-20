const Route = require('../models/route');
const rules = require('../rules/routeRules');
const { Op } = require('sequelize');

async function getAll() {
  return Route.findAll()
    .then((routes) => {
      return routes;
    })
    .catch((err) => {
      throw `routeServices: DB Error: ${err}`;
    });
}

async function getInactive() {
  return Route.findAll({
    where: { deletedAt: { [Op.ne]: null } },
    paranoid: false,
  })
    .then((routes) => {
      return routes;
    })
    .catch((err) => {
      throw `routeServices: DB Error: ${err}`;
    });
}

async function getById(id) {
  const isId = await rules.isId(id);

  if (isId) {
    return Route.findByPk(id)
      .then((route) => {
        return route;
      })
      .catch((err) => {
        throw `routeServices: DB Error: ${err}`;
      });
  } else {
    throw `routeServices: id is not valid.`;
  }
}

async function create(data) {
  const result = await rules.create(data);

  if (result.name) {
    return Route.create(result)
      .then((route) => {
        return route;
      })
      .catch((err) => {
        throw `routeServices: DB Error: ${err}`;
      });
  } else {
    throw `routeServices: ${result}`;
  }
}

async function update(data) {
  const result = await rules.update(data);

  if (result.id) {
    return Route.update(result, { where: { id: result.id } })
      .then((route) => {
        return route;
      })
      .catch((err) => {
        throw `routeServices: DB Error: ${err}`;
      });
  } else {
    throw `userServices: ${result}`;
  }
}

async function restore(id) {
  const isId = await rules.isInactiveId(id);

  if (isId) {
    return Route.restore({ where: { id } }).catch((err) => {
      throw `routeServices: restore: DB error: ${err}`;
    });
  } else {
    throw `routeServices: id is not valid.`;
  }
}

async function remove(id) {
  const isId = await rules.isId(id);

  if (isId) {
    return Route.destroy({ where: { id: id } }).catch((err) => {
      throw `routeServices: DB Error: ${err}`;
    });
  } else {
    throw `routeServices: id is not valid.`;
  }
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
