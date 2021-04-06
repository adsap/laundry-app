'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Laundry extends Model {
    getKg() {
      return this.weight + " KG";
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    
  };
  Laundry.init({
    CustomerId: DataTypes.INTEGER,
    EmployeeId: DataTypes.INTEGER,
    laundry_type: DataTypes.STRING,
    weight: DataTypes.FLOAT,
    entry_date: DataTypes.DATE,
    finish_date: DataTypes.DATE,
    total_cost: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Laundry',
  });
  Laundry.associate = function (models) {
    Laundry.belongsTo(models.Employee)
    Laundry.belongsTo(models.Customer)
  }
  return Laundry;
};