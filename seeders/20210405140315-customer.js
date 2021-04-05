'use strict';

const data = require('../databases/customer.json')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const seed = data.map(customer => {
      return { ...customer, createdAt: new Date(), updatedAt: new Date() }
    })
    await queryInterface.bulkInsert('Customers', seed, {})
    await queryInterface.sequelize.query(`SELECT setval('"Customers_id_seq"', (SELECT MAX(id) FROM "Customers"))`)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Customers', null, {})
  }
};
