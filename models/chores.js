

module.exports = function(sequelize, DataTypes) {
  var Chores = sequelize.define("Chores", 
  {
  chore_id: { type:DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  group_id: DataTypes.INTEGER,
  user_id: DataTypes.INTEGER,
  chore_desc: DataTypes.STRING,
  chore_amt: DataTypes.STRING,
  status: DataTypes.INTEGER,
  due_date: DataTypes.DATE
  }
  )
  return Chores;
}
