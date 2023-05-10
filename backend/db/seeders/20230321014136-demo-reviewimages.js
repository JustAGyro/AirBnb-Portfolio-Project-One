'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(
      options,
      [
        //Spot 1 (2 Reviews per spot)
        {
          reviewId: 1,
          url: 'image.jpeg',
        },
        {
          reviewId: 2,
          url: 'image.jpeg',
        },
        //Spot 2 (2 Reviews per spot)
        {
          reviewId: 3,
          url: 'image.jpeg',
        },
        {
          reviewId: 4,
          url: 'image.jpeg',
        },
        //Spot 3 (2 Reviews per spot)
        {
          reviewId: 5,
          url: 'image.jpeg',
        },
        {
          reviewId: 6,
          url: 'image.jpeg',
        },
        //Spot 4 (2 Reviews per spot)
        {
          reviewId: 7,
          url: 'image.jpeg',
        },
        {
          reviewId: 8,
          url: 'image.jpeg',
        },
        //Spot 5 (2 Reviews per spot)
        {
          reviewId: 9,
          url: 'image.jpeg',
        },
        {
          reviewId: 10,
          url: 'image.jpeg',
        },
        //Spot 6 (2 Reviews per spot)
        {
          reviewId: 11,
          url: 'image.jpeg',
        },
        {
          reviewId: 12,
          url: 'image.jpeg',
        },
        //Spot 7 (2 Reviews per spot)
        {
          reviewId: 13,
          url: 'image.jpeg',
        },
        {
          reviewId: 14,
          url: 'image.jpeg',
        },
        //Spot 8 (2 Reviews per spot)
        {
          reviewId: 15,
          url: 'image.jpeg',
        },
        {
          reviewId: 16,
          url: 'image.jpeg',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkDelete(options, {}, {});
  },
};
