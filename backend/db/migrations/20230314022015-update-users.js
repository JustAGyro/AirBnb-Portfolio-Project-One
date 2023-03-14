'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Users';
    await queryInterface.addColumn(
      options,
      'firstName',
      {
        type: Sequelize.DataTypes.STRING,
      },
      options
    );
    await queryInterface.addColumn(
      options,
      'lastName',
      {
        type: Sequelize.DataTypes.STRING,
      },
      options
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Users';
    queryInterface.removeColumn(options, 'firstName'),
      queryInterface.removeColumn(options, 'lastName');
  },
};
