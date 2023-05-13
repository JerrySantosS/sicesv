const User = require('../models/user');

async function isUser(user_name){
  const count = await User.count({ where: { user_name: user_name } });
  return count !== 0;
}

async function isId(id) {
  const count = await User.count({ where: { id: id } });
  return count !== 0;
}

function rules({ user_name, password, type, active, ...rest }) {
  let issues = [];

  if (typeof user_name !== 'string' || user_name.length < 2 || user_name.length > 13) {
    issues.push('Name must be a string with between 2 and 13 characters.');
  }
  if (typeof password !== 'string' || password.length < 4) {
    issues.push('Password must be a string with at least 4 characters.');
  }
  if (typeof type !== 'number' || type < 1 || type > 4) {
    issues.push('Type must be an integer between 1 and 4.');
  }
  if (typeof active !== 'boolean') {
    issues.push('Active must be a boolean value.');
  }

  if (issues.length > 0) {
    throw issues;
  } else {
    return {user_name, password, type, active};
  }
}

async function createRules({ user_name, password, type, active, ...rest }) {
  if (await isUser(user_name)) {
    throw `userRules: User with name ${user_name} already exists.`;
  } else {
    return rules({ user_name, password, type, active,...rest });
  }
}

async function updateRules({ id, user_name, password, type, active, ...rest }) {
  if (await isId(id)) {
    const result = rules({ user_name, password, type, active, ...rest });

    if (result.user_name) {
      result.id = id;
      return result;
    }else {
      throw `userRules: ${result}`;
    };
  } else {
    throw `userRules: User with id ${id} does not exist.`;
  }
}

module.exports =  {
  createRules,
  updateRules,
  isUser,
  isId
}

