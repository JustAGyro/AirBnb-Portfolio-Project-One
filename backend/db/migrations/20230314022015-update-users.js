'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'firstName', {
      type: Sequelize.DataTypes.STRING,
    });
    await queryInterface.addColumn('Users', 'lastName', {
      type: Sequelize.DataTypes.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeColumn('Users', 'firstName'),
      queryInterface.removeColumn('Users', 'lastName');
  },
};
