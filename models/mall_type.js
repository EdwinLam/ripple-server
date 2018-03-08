/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mall_type', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    typeId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    typeName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    idLink: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'mall_type'
  });
};
