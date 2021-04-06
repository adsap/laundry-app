'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Employee.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: true
      }
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        isNumeric: true
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Employee',
  });
  Employee.associate = function (models) {
    Employee.hasMany(models.Laundry)
  }
  return Employee;
};