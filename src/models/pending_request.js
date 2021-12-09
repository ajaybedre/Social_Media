const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pending_request', {
    Sender: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true
    },
    Reciever: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'pending_request',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Sender" },
        ]
      },
    ]
  });
};
