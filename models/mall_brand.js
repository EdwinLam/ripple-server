/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mall_brand', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    brandName: {
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
    tableName: 'mall_brand'
  });
};
