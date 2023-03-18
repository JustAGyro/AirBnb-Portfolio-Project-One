'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          userId: 1,
          review: 'This place is great!',
          stars: 5,
        },
        {
          spotId: 2,
          userId: 2,
          review: 'This place is cool!',
          stars: 5,
        },
        {
          spotId: 3,
          userId: 3,
          review: 'This place is perfect!',
          stars: 5,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkDelete(options, {}, {});
  },
};
