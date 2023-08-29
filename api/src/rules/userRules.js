const User = require('../models/user');
const bcrypt = require('bcrypt');
const secret = process.env.SECRET;

async function isUser(userName) {
  const count = await User.count({ where: { userName } });
  return count !== 0;
}

async function isId(id) {
  const count = await User.count({ where: { id } });
  return count !== 0;
}

async function isInactiveId(id) {
  const count = await User.count({ where: { id }, paranoid: false });
  return count !== 0;
}

async function rules({ name, userName, password, type, ...rest }) {
  let issues = [];

  if (
    typeof userName !== 'string' ||
    userName.length < 2 ||
    userName.length > 13
  ) {
    issues.push('Name must be a string with between 2 and 13 characters.');
  }
  if (typeof password !== 'string' || password.length < 4) {
    issues.push('Password must be a string with at least 4 characters.');
  }
  if (typeof type !== 'string' || type.length < 8 || type.length > 16) {
    issues.push('Type must be an string between 8 and 16 characters.');
  }
  if (typeof name !== 'string' || name.length < 2 || name.length > 255) {
    issues.push('Name must be a string with between 2 and 255 characters.');
  }

  if (issues.length > 0) {
    throw issues;
  } else {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    return { name, userName, password, type };
  }
}

async function create({ name, userName, password, type, ...rest }) {
  if (await isUser(userName)) {
    throw `userRules: User with name ${userName} already exists.`;
  } else {
    return rules({ name, userName, password, type });
  }
}

async function update({ id, name, userName, password, type, ...rest }) {
  if (await isId(id)) {
    const result = await rules({ name, userName, password, type, ...rest });

    if (result.userName) {
      result.id = id;
      return result;
    } else {
      throw `userRules: ${result}`;
    }
  } else {
    throw `userRules: User with id ${id} does not exist.`;
  }
}

module.exports = {
  create,
  update,
  isUser,
  isId,
  isInactiveId,
};
