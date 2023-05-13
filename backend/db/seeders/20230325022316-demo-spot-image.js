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
        //Spot 1
        {
          spotId: 1,
          preview: true,
          url: 'https://i.ibb.co/frDGhX6/794770.jpg',
        },
        {
          spotId: 1,
          preview: false,
          url: 'https://i.ibb.co/VVYLZnm/Old-Town.jpg',
        },
        {
          spotId: 1,
          preview: false,
          url: 'https://i.ibb.co/9p4rrFy/Slaughtered-Lamb.jpg',
        },
        {
          spotId: 1,
          preview: false,
          url: 'https://i.ibb.co/yqBZgfk/929966.jpg',
        },
        {
          spotId: 1,
          preview: false,
          url: 'https://i.ibb.co/JrXfGvv/xdvT62l.jpg',
        },
        //Spot 2
        {
          spotId: 2,
          preview: true,
          url: 'https://i.ibb.co/Xt9YPrD/The-Broken-Tusk.jpg',
        },
        {
          spotId: 2,
          preview: false,
          url: 'https://i.ibb.co/ZxcmRSQ/The-Wyvern-s-Tail-Int.jpg',
        },
        {
          spotId: 2,
          preview: false,
          url: 'https://i.ibb.co/R9sWc54/797395.jpg',
        },
        {
          spotId: 2,
          preview: false,
          url: 'https://i.ibb.co/tss7vbK/219092-unfamiliar-waters.jpg',
        },
        {
          spotId: 2,
          preview: false,
          url: 'https://i.ibb.co/5BtLk8m/wowscrnshot092410143323.jpg',
        },
        //Spot 3
        {
          spotId: 3,
          preview: true,
          url: 'https://i.ibb.co/Yp522bF/954381-darnassus.jpg',
        },
        {
          spotId: 3,
          preview: false,
          url: 'https://i.ibb.co/hcBDVJ8/Darn-Sky-Pic.jpg',
        },
        {
          spotId: 3,
          preview: false,
          url: 'https://i.ibb.co/cv7QYtL/22277-darnassus.jpg',
        },
        {
          spotId: 3,
          preview: false,
          url: 'https://i.ibb.co/gyhc1PC/Darnassus-TCG.jpg',
        },
        {
          spotId: 3,
          preview: false,
          url: 'https://i.ibb.co/wLZ0X90/EV4-IC3-N0-FL1-Z1569889457108.jpg',
        },
        //Spot 4
        {
          spotId: 4,
          preview: true,
          url: 'https://i.ibb.co/Vq3Gb4B/8-O1-A97-BC3-B7-K1569342314291.jpg',
        },
        {
          spotId: 4,
          preview: false,
          url: 'https://i.ibb.co/3sFd1BX/809638.jpg',
        },
        {
          spotId: 4,
          preview: false,
          url: 'https://i.ibb.co/0q7XW27/809246.jpg',
        },
        {
          spotId: 4,
          preview: false,
          url: 'https://i.ibb.co/py8KSCW/The-Stonefire-Tavern.jpg',
        },
        {
          spotId: 4,
          preview: false,
          url: 'https://i.ibb.co/h9rDjv8/Ahn-Qiraj-War-Effort-Ironforge.jpg',
        },
        //Spot 5
        {
          spotId: 5,
          preview: true,
          url: 'https://i.ibb.co/YytBZcs/The-Salty-Sailor-Tavern.jpg',
        },
        {
          spotId: 5,
          preview: false,
          url: 'https://i.ibb.co/p67XTY0/456158-booty-bay.jpg',
        },
        {
          spotId: 5,
          preview: false,
          url: 'https://i.ibb.co/8X6Rx9Z/maxresdefault.jpg',
        },
        {
          spotId: 5,
          preview: false,
          url: 'https://i.ibb.co/wpWDfhm/booty.jpg',
        },
        {
          spotId: 5,
          preview: false,
          url: 'https://i.ibb.co/6HQ3r4j/fuwllgxm08d51.jpg',
        },
        //Spot 6
        {
          spotId: 6,
          preview: true,
          url: 'https://i.ibb.co/pbbDJ4d/nqy78o5gvwn41.jpg',
        },
        {
          spotId: 6,
          preview: false,
          url: 'https://i.ibb.co/DMmGC8w/Sunfury-Court2.jpg',
        },
        {
          spotId: 6,
          preview: false,
          url: 'https://i.ibb.co/0n2jrHf/805493.jpg',
        },
        {
          spotId: 6,
          preview: false,
          url: 'https://i.ibb.co/JK0ydnQ/47d37b2b9e1fef975de5d635934f974c.jpg',
        },
        {
          spotId: 6,
          preview: false,
          url: 'https://i.ibb.co/8K9ymKc/1f2f1761532c5fc81155aade25ba7a46.jpg',
        },
        //Spot 7
        {
          spotId: 7,
          preview: true,
          url: 'https://i.ibb.co/p3z2b3S/7-WK6-ZKHK4-M8-S1570206486645.jpg',
        },
        {
          spotId: 7,
          preview: false,
          url: 'https://i.ibb.co/Qm2sr2f/7648.jpg',
        },
        {
          spotId: 7,
          preview: false,
          url: 'https://i.ibb.co/16X7mbC/85141-flame-of-thunder-bluff.jpg',
        },
        {
          spotId: 7,
          preview: false,
          url: 'https://i.ibb.co/cD2p2mq/ww.jpg',
        },
        {
          spotId: 7,
          preview: false,
          url: 'https://i.ibb.co/SQFBhPg/wow-classic-2.jpg',
        },
        //Spot 8
        {
          spotId: 8,
          preview: true,
          url: 'https://i.ibb.co/598BX1k/DBL5-AH5-UT1-HN1569603616452.jpg',
        },
        {
          spotId: 8,
          preview: false,
          url: 'https://i.ibb.co/fQRTdp1/Undercity-Inn.jpg',
        },
        {
          spotId: 8,
          preview: false,
          url: 'https://i.ibb.co/w6LjKWY/Wo-WScrn-Shot-111118-012831.jpg',
        },
        {
          spotId: 8,
          preview: false,
          url: 'https://i.ibb.co/F7R0G5d/screenshot-042110-170713.jpg',
        },
        {
          spotId: 8,
          preview: false,
          url: 'https://i.ibb.co/nb7crDW/Undercity-Trade-Quarter.jpg',
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
