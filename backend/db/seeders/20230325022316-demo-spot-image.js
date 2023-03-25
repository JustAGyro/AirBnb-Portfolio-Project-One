'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          preview: true,
          url: 'image.url',
        },
        {
          spotId: 2,
          preview: true,
          url: 'image.url',
        },
        {
          spotId: 3,
          preview: true,
          url: 'image.url',
        },
        {
          spotId: 4,
          preview: true,
          url: 'image.url',
        },
        {
          spotId: 5,
          preview: true,
          url: 'image.url',
        },
        {
          spotId: 6,
          preview: true,
          url: 'image.url',
        },
        {
          spotId: 7,
          preview: true,
          url: 'image.url',
        },
        {
          spotId: 8,
          preview: true,
          url: 'image.url',
        },
        {
          spotId: 9,
          preview: true,
          url: 'image.url',
        },
        {
          spotId: 10,
          preview: true,
          url: 'image.url',
        },
        {
          spotId: 1,
          preview: true,
          url: 'image.url',
        },
        {
          spotId: 2,
          preview: true,
          url: 'image.url',
        },
        {
          spotId: 3,
          preview: true,
          url: 'image.url',
        },
        {
          spotId: 4,
          preview: true,
          url: 'image.url',
        },
        {
          spotId: 5,
          preview: true,
          url: 'image.url',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkDelete(options, {}, {});
  },
};
