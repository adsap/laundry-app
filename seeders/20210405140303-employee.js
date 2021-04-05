'use strict';

const data = require('../databases/employee.json')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const seed = data.map(employee => {
      return { ...employee, createdAt: new Date(), updatedAt: new Date() }
    })
    await queryInterface.bulkInsert('Employees', seed, {})
    await queryInterface.sequelize.query(`SELECT setval('"Employees_id_seq"', (SELECT MAX(id) FROM "Employees"))`)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Employees', null, {})
  }
};
