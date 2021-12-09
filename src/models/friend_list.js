const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('friend_list', {
    User_ID: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true
    },
    Friend_ID: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'friend_list',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "User_ID" },
          { name: "Friend_ID" },
        ]
      },
    ]
  });
};
