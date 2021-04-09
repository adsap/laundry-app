'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Customer.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Nama tidak boleh kosong'
        },
        isAlpha: true
      }
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Phone tidak boleh kosong'
        },
        isNumeric: true
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email tidak boleh kosong'
        },
        isEmail: true
      }
    },
    address: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Address tidak boleh kosong'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Customer',
  });
  Customer.associate = function (models) {
    Customer.hasMany(models.Laundry)
  }
  return Customer;
};