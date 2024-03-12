const { DataTypes } = require('sequelize');
const sequelize = require('../../config/sequelize');
const Inspection = require('./inspection');
const Item = require('./item');

const CheckList = sequelize.define(
  'CheckList',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING(150),
      allowNull: true,
      defaultValue: '',
    },
  },
  { paranoid: true }
);

// relação de um para muitos entre Inspection e CheckList
// e entre Item e CheckList
Inspection.hasMany(CheckList);
Item.hasOne(CheckList);
CheckList.belongsTo(Item);
CheckList.belongsTo(Inspection);

// (async () => {
//   await CheckList.sync({ force: true });
// })();
// console.log(CheckList === sequelize.models.CheckList);

module.exports = CheckList;
