

module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", 
  {
  user_id: { type:DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  first_name: DataTypes.STRING, 
  last_name: DataTypes.STRING,
  nickname: DataTypes.STRING,
  password: DataTypes.STRING,
  email: DataTypes.STRING,
  group_id: DataTypes.INTEGER,
  user_type:DataTypes.INTEGER
  }
  )
  return Users;
}
