const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('try', {
    Sender: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    Rec: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'try',
    timestamps: false
  });
};
