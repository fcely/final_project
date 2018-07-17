module.exports = function(sequelize, DataTypes) {
  var Transactions = sequelize.define("Transactions", 
  {
  trx_id: { type:DataTypes.INTEGER, autoIncrement: true, primaryKey: true }, 
  account_id: DataTypes.INTEGER,
  trx_type: DataTypes.STRING,
  trx_amt: DataTypes.FLOAT,
  trx_desc: DataTypes.STRING,
  beg_balance:DataTypes.FLOAT,
  end_balance:DataTypes.FLOAT,
  chore_id: DataTypes.INTEGER
  }
  )
  return Transactions;
}