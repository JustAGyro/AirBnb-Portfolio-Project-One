'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(
      options,
      [
        {
          ownerId: 1,
          address: '123 Disney Lane',
          city: 'San Francisco',
          state: 'California',
          country: 'United States of America',
          lat: 37.7645358,
          lng: -122.4730327,
          name: 'App Academy',
          description: 'Place where web developers are created',
          price: 123,
        },
        {
          ownerId: 2,
          address: '456 Gaming Drive',
          city: 'Los Angeles',
          state: 'California',
          country: 'United States of America',
          lat: 40.7645358,
          lng: -152.4730327,
          name: 'Riot Games',
          description: 'Pogchamp',
          price: 250,
        },
        {
          ownerId: 3,
          address: '789 Gaming Drive',
          city: 'San Francisco',
          state: 'California',
          country: 'United States of America',
          lat: 57.7645358,
          lng: -112.4730327,
          name: 'Blizzard Studios',
          description: 'Wow is best MMO :)',
          price: 500,
        },
        {
          ownerId: 4,
          address: '789 Gaming Drive',
          city: 'San Francisco',
          state: 'California',
          country: 'United States of America',
          lat: 57.7645358,
          lng: -112.4730327,
          name: 'Blizzard Studios',
          description: 'Wow is best MMO :)',
          price: 500,
        },
        {
          ownerId: 5,
          address: '789 Gaming Drive',
          city: 'San Francisco',
          state: 'California',
          country: 'United States of America',
          lat: 57.7645358,
          lng: -112.4730327,
          name: 'Blizzard Studios',
          description: 'Wow is best MMO :)',
          price: 500,
        },
        {
          ownerId: 6,
          address: '789 Gaming Drive',
          city: 'San Francisco',
          state: 'California',
          country: 'United States of America',
          lat: 57.7645358,
          lng: -112.4730327,
          name: 'Blizzard Studios',
          description: 'Wow is best MMO :)',
          price: 500,
        },
        {
          ownerId: 7,
          address: '789 Gaming Drive',
          city: 'San Francisco',
          state: 'California',
          country: 'United States of America',
          lat: 57.7645358,
          lng: -112.4730327,
          name: 'Blizzard Studios',
          description: 'Wow is best MMO :)',
          price: 500,
        },
        {
          ownerId: 8,
          address: '789 Gaming Drive',
          city: 'San Francisco',
          state: 'California',
          country: 'United States of America',
          lat: 57.7645358,
          lng: -112.4730327,
          name: 'Blizzard Studios',
          description: 'Wow is best MMO :)',
          price: 500,
        },
        {
          ownerId: 9,
          address: '789 Gaming Drive',
          city: 'San Francisco',
          state: 'California',
          country: 'United States of America',
          lat: 57.7645358,
          lng: -112.4730327,
          name: 'Blizzard Studios',
          description: 'Wow is best MMO :)',
          price: 500,
        },
        {
          ownerId: 10,
          address: '789 Gaming Drive',
          city: 'San Francisco',
          state: 'California',
          country: 'United States of America',
          lat: 57.7645358,
          lng: -112.4730327,
          name: 'Blizzard Studios',
          description: 'Wow is best MMO :)',
          price: 500,
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
