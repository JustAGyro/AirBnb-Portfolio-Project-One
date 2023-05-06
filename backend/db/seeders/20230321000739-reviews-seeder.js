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
          userId: 1,
          spotId: 1,
          review: 'This place is awesome!',
          stars: 4,
        },
        {
          userId: 3,
          spotId: 1,
          review: 'This place is awesome1!',
          stars: 3,
        },
        {
          userId: 1,
          spotId: 3,
          review: 'This place is awesome2!',
          stars: 4,
        },
        {
          userId: 1,
          spotId: 4,
          review: 'This place is awesome3!',
          stars: 4,
        },
        {
          userId: 1,
          spotId: 5,
          review: 'This place is awesome4!',
          stars: 4,
        },
        {
          userId: 2,
          spotId: 1,
          review: 'This place is awesome5!',
          stars: 4,
        },
        {
          userId: 2,
          spotId: 2,
          review: 'This place is awesome5!',
          stars: 4,
        },
        {
          userId: 2,
          spotId: 3,
          review: 'This place is awesome5!',
          stars: 4,
        },
        {
          userId: 2,
          spotId: 4,
          review: 'This place is awesome5!',
          stars: 4,
        },
        {
          userId: 3,
          spotId: 5,
          review: 'This place is awesome5!',
          stars: 4,
        },
        {
          userId: 3,
          spotId: 6,
          review: 'This place is awesome5!',
          stars: 4,
        },
        {
          userId: 3,
          spotId: 7,
          review: 'This place is awesome5!',
          stars: 4,
        },
        {
          userId: 3,
          spotId: 8,
          review: 'This place is awesome5!',
          stars: 4,
        },
        {
          userId: 3,
          spotId: 9,
          review: 'This place is awesome5!',
          stars: 4,
        },
        {
          userId: 3,
          spotId: 10,
          review: 'This place is awesome5!',
          stars: 4,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkDelete(options, {}, {});
  },
};
