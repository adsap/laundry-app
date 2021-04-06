'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Laundries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      CustomerId: {
        type: Sequelize.INTEGER
      },
      EmployeeId: {
        type: Sequelize.INTEGER
      },
      laundry_type: {
        type: Sequelize.STRING
      },
      weight: {
        type: Sequelize.FLOAT
      },
      entry_date: {
        type: Sequelize.DATE
      },
      finish_date: {
        type: Sequelize.DATE
      },
      process_days: {
        type: Sequelize.INTEGER
      },
      total_cost: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Laundries');
  }
};