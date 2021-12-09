var DataTypes = require("sequelize").DataTypes;
var _friend_list = require("./friend_list");
var _pending_request = require("./pending_request");
var _pending_requests = require("./pending_requests");
var _try = require("./try");
var _userstable = require("./userstable");

function initModels(sequelize) {
  var friend_list = _friend_list(sequelize, DataTypes);
  var pending_request = _pending_request(sequelize, DataTypes);
  var pending_requests = _pending_requests(sequelize, DataTypes);
  var tryq = _try(sequelize, DataTypes);
  var userstable = _userstable(sequelize, DataTypes);

  pending_requests.belongsTo(userstable, { as: "Sender_userstable", foreignKey: "Sender"});
  userstable.hasMany(pending_requests, { as: "pending_requests", foreignKey: "Sender"});

  return {
    friend_list,
    pending_request,
    pending_requests,
    tryq,
    userstable,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
