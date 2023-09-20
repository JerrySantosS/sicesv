const Item = require('../models/item');
const rules = require('../rules/itemRules');
const { Op } = require('sequelize');

async function getAll() {
  return Item.findAll()
    .then((items) => {
      return items;
    })
    .catch((err) => {
      throw `itemServices: DB Error: ${err}`;
    });
}

async function getInactive() {
  return Item.findAll({
    where: { deletedAt: { [Op.ne]: null } },
    paranoid: false,
  })
    .then((items) => {
      return items;
    })
    .catch((err) => {
      throw `itemServices: DB Error: ${err}`;
    });
}

async function getById(id) {
  const isId = await rules.isId(id);

  if (isId) {
    return Item.findByPk(id)
      .then((item) => {
        return item;
      })
      .catch((err) => {
        throw `itemServices: DB Error: ${err}`;
      });
  } else {
    throw `itemServices: id is not valid.`;
  }
}

async function create(data) {
  const result = await rules.create(data);

  if (result.name) {
    return Item.create(result)
      .then((item) => {
        return item;
      })
      .catch((err) => {
        throw `itemServices: DB Error: ${err}`;
      });
  } else {
    throw `itemServices: ${result}`;
  }
}

async function update(data) {
  const result = await rules.update(data);

  if (result.id) {
    return Item.update(result, { where: { id: result.id } })
      .then((item) => {
        return item;
      })
      .catch((err) => {
        throw `itemServices: DB Error: ${err}`;
      });
  } else {
    throw `userServices: ${result}`;
  }
}

async function restore(id) {
  const isId = await rules.isInactiveId(id);

  if (isId) {
    return Item.restore({ where: { id } }).catch((err) => {
      throw `itemServices: restore: DB error: ${err}`;
    });
  } else {
    throw `itemServices: id is not valid.`;
  }
}

async function remove(id) {
  const isId = await rules.isId(id);

  if (isId) {
    return Item.destroy({ where: { id: id } }).catch((err) => {
      throw `itemServices: DB Error: ${err}`;
    });
  } else {
    throw `itemServices: id is not valid.`;
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
