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
          spot: 'App Academy',
          user: 'Demo-lition',
          review: 'This place is great!',
          stars: 5,
        },
        {
          spot: 'Riot Games',
          user: 'FakeUser1',
          review: 'This place is cool!',
          stars: 5,
        },
        {
          spot: 'Blizzard Studios',
          user: 'FakeUser2',
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
