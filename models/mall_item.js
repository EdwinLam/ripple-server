/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mall_item', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    brandId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    itemName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    createAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updateAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'mall_item'
  });
};
