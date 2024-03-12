const Item = require('../models/item');
const generalRules = require('./generalRules');

async function isItem(name) {
  const count = await Item.count({ where: { name } });
  return count !== 0;
}

async function isId(id) {
  const count = await Item.count({ where: { id } });
  return count !== 0;
}

async function isInactiveId(id) {
  const count = await Item.count({ where: { id }, paranoid: false });
  return count !== 0;
}

// verifica se os dados estão dentro das regras de negócio
function rules({ name, type, area }) {
  let issues = [];

  if (!generalRules.stringValidate(name, 2, 50))
    issues.push('Um nome deve ter entre 2 e 50 caracteres');
  if (!generalRules.stringValidate(type, 2, 50))
    issues.push('Um tipo deve ter entre 2 e 50 caracteres');

  if (!generalRules.stringValidate(area, 2, 50))
    issues.push('Uma area deve ter entre 2 e 50 caracteres');

  if (issues.length > 0) {
    throw issues;
  } else {
    return { name, type, area };
  }
}

async function create({ name, type, area, ...rest }) {
  if (await isItem(name)) {
    throw `itemRules: Item with name ${name} already exists.`;
  } else {
    return rules({ name, type, area });
  }
}

async function update({ id, name, type, area, ...rest }) {
  if (await isId(id)) {
    const result = rules({ name, type, area });

    if (result.name) {
      result.id = id;
      return result;
    } else {
      throw `itemRules: ${result}`;
    }
  } else {
    throw `itemRules: Item with id ${id} does not exist.`;
  }
}

module.exports = {
  create,
  update,
  isItem,
  isId,
  isInactiveId,
};
