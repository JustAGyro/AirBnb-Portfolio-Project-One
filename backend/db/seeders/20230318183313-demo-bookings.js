'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(
      options,
      [
        {
          spot: 'App Academy',
          user: 'Demo-lition',
          startDate: '2022-01-01',
          endDate: '2022-01-02',
        },
        {
          spot: 'Riot Games',
          user: 'FakeUser1',
          startDate: '2022-02-01',
          endDate: '2022-02-02',
        },
        {
          spot: 'Blizzard Studios',
          user: 'FakeUser2',
          startDate: '2022-03-01',
          endDate: '2022-03-02',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    return queryInterface.bulkDelete(options, {}, {});
  },
};
