'use strict';
const moment = require('moment');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Laundry extends Model {
    getKg() {
      return this.weight + " KG";
    }

    static getNoType() {
      return "full cleaning"
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
    CustomerId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Customer tidak boleh kosong'
        },
        isNumeric: true
      }
    },
    EmployeeId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Employee tidak boleh kosong'
        },
        isNumeric: true
      }
    },
    laundry_type: DataTypes.STRING,
    weight: {
      type: DataTypes.FLOAT,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Weight tidak boleh kosong'
        },
        isFloat: true
      }
    },
    entry_date: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Entry date tidak boleh kosong'
        },
        isDate: true
      }
    },
    finish_date: DataTypes.DATE,
    process_days: DataTypes.INTEGER,
    total_cost: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Laundry',
  });
  Laundry.associate = function (models) {
    Laundry.belongsTo(models.Employee)
    Laundry.belongsTo(models.Customer)
  }
  Laundry.addHook('beforeUpdate', 'daysProcess', (laundry) => {
    if (laundry.finish_date) laundry.process_days = moment(laundry.finish_date).diff(moment(laundry.entry_date), 'days');
  })
  return Laundry;
};