
module.exports = function(sequelize, DataTypes) {
  var Requests = sequelize.define("Requests", 
  {
  request_id: { type:DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: DataTypes.INTEGER,
  request_status: DataTypes.INTEGER,
  request_desc: DataTypes.STRING,
  request_amt: DataTypes.FLOAT
  }
  )
  return Requests;
}
