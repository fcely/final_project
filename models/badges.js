
module.exports = function(sequelize, DataTypes) {
  var Badges = sequelize.define("Badges", 
  {
  record_id: { type:DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: DataTypes.INTEGER,
  badge_id: DataTypes.INTEGER,
  image_url:DataTypes.STRING
  }
  )
  return Badges;
}
