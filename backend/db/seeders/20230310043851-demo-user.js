'use strict';
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(
      options,
      [
        {
          email: 'king.varian@stormwind.com',
          username: 'varian',
          hashedPassword: bcrypt.hashSync('lionhearted1'),
          firstName: 'Varian',
          lastName: 'Wrynn',
        },
        {
          email: 'thrall@durotar.com',
          username: 'thrall',
          hashedPassword: bcrypt.hashSync('warchief123'),
          firstName: 'Thrall',
          lastName: 'Son of Durotan',
        },
        {
          email: 'malfurion@teldrassil.com',
          username: 'malfurion',
          hashedPassword: bcrypt.hashSync('dreamweaver1'),
          firstName: 'Malfurion',
          lastName: 'Stormrage',
        },
        {
          email: 'brann@ironforge.com',
          username: 'brann',
          hashedPassword: bcrypt.hashSync('explorer1'),
          firstName: 'Brann',
          lastName: 'Bronzebeard',
        },
        {
          email: 'gallywix@kezan.com',
          username: 'gallywix',
          hashedPassword: bcrypt.hashSync('ilovegold1'),
          firstName: 'Gallywix',
          lastName: 'The Great',
        },
        {
          email: 'liadrin@silvermoon.com',
          username: 'liadrin',
          hashedPassword: bcrypt.hashSync('sunfury123'),
          firstName: 'Lady',
          lastName: 'Liadrin',
        },
        {
          email: 'cairne@thunderbluff.com',
          username: 'cairne',
          hashedPassword: bcrypt.hashSync('highmountain1'),
          firstName: 'Cairne',
          lastName: 'Bloodhoof',
        },
        {
          email: 'sylvanas@undercity.com',
          username: 'sylvanas',
          hashedPassword: bcrypt.hashSync('darklady1'),
          firstName: 'Sylvanas',
          lastName: 'Windrunner',
        },
        {
          email: 'demo@user.io',
          username: 'DemoChampion',
          hashedPassword: bcrypt.hashSync('password'),
          firstName: 'Demo',
          lastName: 'Champion',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] },
      },
      {}
    );
  },
};
