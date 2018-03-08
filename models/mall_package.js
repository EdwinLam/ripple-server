/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mall_package', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    packageName: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'mall_package'
  });
};
