'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Laundries', {
      fields: ['CustomerId'],
      type: 'foreign key',
      name: 'fk_CustomerId',
      references: {
        table: 'Customers',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    await queryInterface.addConstraint('Laundries', {
      fields: ['EmployeeId'],
      type: 'foreign key',
      name: 'fk_EmployeeId',
      references: {
        table: 'Employees',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Laundries', 'fk_CustomerId');
    await queryInterface.removeConstraint('Laundries', 'fk_EmployeeId');
  }
};
