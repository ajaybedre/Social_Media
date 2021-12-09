const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pending_requests', {
    Sender: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'userstable',
        key: 'username'
      }
    },
    Reciever: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'pending_requests',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Sender" },
          { name: "Reciever" },
        ]
      },
      {
        name: "Reciever_ID_idx",
        using: "BTREE",
        fields: [
          { name: "Reciever" },
        ]
      },
      {
        name: "fk_pending_idx",
        using: "BTREE",
        fields: [
          { name: "Sender" },
        ]
      },
    ]
  });
};
