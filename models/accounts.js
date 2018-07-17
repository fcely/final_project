
module.exports = function(sequelize, DataTypes) {
  var Accounts = sequelize.define("Accounts", 
  {
  account_id: { type:DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: DataTypes.INTEGER,
  account_desc: DataTypes.STRING,
  balance: DataTypes.FLOAT
  }
  )
  return Accounts;
}
