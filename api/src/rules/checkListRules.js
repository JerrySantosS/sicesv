const CheckList = require('../models/checkList');
const inspectionRules = require('../rules/inspectionRules');
const itemRules = require('../rules/itemRules');

async function isId(id) {
  const count = await CheckList.count({ where: { id } });
  return count !== 0;
}

async function rules({ status, type, InspectionId, ItemId, comment }) {
  let issues = [];
  if (typeof type !== 'number' || type < 1 || type > 2)
    issues.push('type must be a number between 1 and 2');

  if (typeof status !== 'boolean') issues.push('status must be a boolean');

  if (typeof comment !== 'string' || comment.length > 150)
    issues.push('comment must be a string less than 150 characters');

  if (!inspectionRules.isId(InspectionId))
    issues.push('inspectionId is not valid');

  if (!itemRules.isId(ItemId)) issues.push('itemId is not valid');

  if (issues.length > 0) {
    throw `checkListRules: ${issues}`;
  } else {
    return {
      status,
      type,
      InspectionId,
      ItemId,
      comment,
    };
  }
}
async function create({
  status,
  type,
  InspectionId,
  ItemId,
  comment,
  ...rest
}) {
  return rules({ status, type, InspectionId, ItemId, comment });
}

async function update({
  id,
  status,
  type,
  InspectionId,
  ItemId,
  comment,
  ...rest
}) {
  if (isId(id)) {
    const result = rules({ status, type, InspectionId, ItemId, comment });

    if (result.type) {
      result.id = id;
      return result;
    } else {
      throw `checkListRules: id is not valid`;
    }
  }
}

module.exports = {
  isId,
  create,
  update,
};
