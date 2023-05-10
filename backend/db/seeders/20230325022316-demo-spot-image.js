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
          url: 'https://wow.zamimg.com/uploads/screenshots/normal/794770.jpg?maxWidth=1800',
        },
        {
          spotId: 1,
          preview: false,
          url: 'https://static.wikia.nocookie.net/wowpedia/images/5/5a/Old_Town.jpg/revision/latest?cb=20110722124441',
        },
        {
          spotId: 1,
          preview: false,
          url: 'https://static.wikia.nocookie.net/wowwiki/images/5/57/Slaughtered_Lamb.jpg/revision/latest?cb=20060611194804',
        },
        {
          spotId: 1,
          preview: false,
          url: 'https://wow.zamimg.com/uploads/screenshots/normal/929966.jpg',
        },
        {
          spotId: 1,
          preview: false,
          url: 'https://imgur.com/xdvT62l.jpg',
        },
        //Spot 2
        {
          spotId: 2,
          preview: true,
          url: 'https://static.wikia.nocookie.net/wowpedia/images/d/d0/The_Broken_Tusk.jpg/revision/latest/scale-to-width-down/1200?cb=20120703054900',
        },
        {
          spotId: 2,
          preview: false,
          url: 'https://static.wikia.nocookie.net/wowwiki/images/3/32/TheWyvern%27sTailInt.jpg/revision/latest/scale-to-width-down/1280?cb=20110506002221',
        },
        {
          spotId: 2,
          preview: false,
          url: 'https://wow.zamimg.com/uploads/screenshots/normal/797395.jpg',
        },
        {
          spotId: 2,
          preview: false,
          url: 'https://wow.zamimg.com/uploads/screenshots/normal/219092-unfamiliar-waters.jpg',
        },
        {
          spotId: 2,
          preview: false,
          url: 'https://blizzardwatch.com/wp-content/uploads/2016/12/wowscrnshot092410143323.jpg',
        },
        //Spot 3
        {
          spotId: 3,
          preview: true,
          url: 'https://wow.zamimg.com/uploads/screenshots/normal/954381-darnassus.jpg',
        },
        {
          spotId: 3,
          preview: false,
          url: 'https://static.wikia.nocookie.net/wowpedia/images/a/af/DarnSkyPic.jpg/revision/latest/scale-to-width-down/1819?cb=20110201041910',
        },
        {
          spotId: 3,
          preview: false,
          url: 'https://wow.zamimg.com/uploads/screenshots/normal/22277-darnassus.jpg',
        },
        {
          spotId: 3,
          preview: false,
          url: 'https://static.wikia.nocookie.net/wowpedia/images/9/92/Darnassus_TCG.jpg/revision/latest?cb=20100612194302',
        },
        {
          spotId: 3,
          preview: false,
          url: 'https://bnetcmsus-a.akamaihd.net/cms/blog_header/ev/EV4IC3N0FL1Z1569889457108.jpg',
        },
        //Spot 4
        {
          spotId: 4,
          preview: true,
          url: 'https://bnetcmsus-a.akamaihd.net/cms/blog_header/8o/8O1A97BC3B7K1569342314291.jpg',
        },
        {
          spotId: 4,
          preview: false,
          url: 'https://wow.zamimg.com/uploads/screenshots/normal/809638.jpg',
        },
        {
          spotId: 4,
          preview: false,
          url: 'https://wow.zamimg.com/uploads/screenshots/normal/809246.jpg',
        },
        {
          spotId: 4,
          preview: false,
          url: 'https://static.wikia.nocookie.net/wowpedia/images/e/e6/The_Stonefire_Tavern.jpg/revision/latest?cb=20071222081306',
        },
        {
          spotId: 4,
          preview: false,
          url: 'https://www.warcrafttavern.com/wp-content/uploads/2020/10/AhnQiraj-War-Effort-Ironforge.jpg',
        },
        //Spot 5
        {
          spotId: 5,
          preview: true,
          url: 'https://static.wikia.nocookie.net/wowpedia/images/5/5e/The_Salty_Sailor_Tavern.jpg/revision/latest?cb=20061110100358',
        },
        {
          spotId: 5,
          preview: false,
          url: 'https://wow.zamimg.com/uploads/screenshots/normal/456158-booty-bay.jpg',
        },
        {
          spotId: 5,
          preview: false,
          url: 'https://i.ytimg.com/vi/0KCM0H9q3hQ/maxresdefault.jpg',
        },
        {
          spotId: 5,
          preview: false,
          url: 'https://azerothinns.files.wordpress.com/2007/08/booty.jpg',
        },
        {
          spotId: 5,
          preview: false,
          url: 'https://i.redd.it/fuwllgxm08d51.jpg',
        },
        //Spot 6
        {
          spotId: 6,
          preview: true,
          url: 'https://i.redd.it/nqy78o5gvwn41.jpg',
        },
        {
          spotId: 6,
          preview: false,
          url: 'https://static.wikia.nocookie.net/wowpedia/images/e/e8/SunfuryCourt2.jpg/revision/latest/scale-to-width-down/1200?cb=20210322171400',
        },
        {
          spotId: 6,
          preview: false,
          url: 'https://wow.zamimg.com/uploads/screenshots/normal/805493.jpg',
        },
        {
          spotId: 6,
          preview: false,
          url: 'https://i.pinimg.com/736x/47/d3/7b/47d37b2b9e1fef975de5d635934f974c.jpg',
        },
        {
          spotId: 6,
          preview: false,
          url: 'https://i.pinimg.com/originals/1f/2f/17/1f2f1761532c5fc81155aade25ba7a46.jpg',
        },
        //Spot 7
        {
          spotId: 7,
          preview: true,
          url: 'https://bnetcmsus-a.akamaihd.net/cms/blog_header/7w/7WK6ZKHK4M8S1570206486645.jpg',
        },
        {
          spotId: 7,
          preview: false,
          url: 'https://wow.zamimg.com/uploads/guide/seo/7648.jpg?1546724238',
        },
        {
          spotId: 7,
          preview: false,
          url: 'https://preview.redd.it/2h8s4hhecba01.jpg?auto=webp&s=389cdfac5806fb5c238b4e3cef96dbea8165fb70',
        },
        {
          spotId: 7,
          preview: false,
          url: 'https://biobreak.files.wordpress.com/2020/09/ww.jpg?w=640',
        },
        {
          spotId: 7,
          preview: false,
          url: 'https://massivelyop.com/wp-content/uploads/2021/04/wow-classic-2.jpg',
        },
        //Spot 8
        {
          spotId: 8,
          preview: true,
          url: 'https://bnetcmsus-a.akamaihd.net/cms/blog_header/db/DBL5AH5UT1HN1569603616452.jpg',
        },
        {
          spotId: 8,
          preview: false,
          url: 'https://static.wikia.nocookie.net/wowpedia/images/8/8b/Undercity_Inn.jpg/revision/latest?cb=20071210023830',
        },
        {
          spotId: 8,
          preview: false,
          url: 'https://preview.redd.it/tscsfy4d5h131.jpg?auto=webp&s=35399d9de9ca8e99b5cdebc8fe73db967b23f8df',
        },
        {
          spotId: 8,
          preview: false,
          url: 'https://blessingoffish.files.wordpress.com/2010/04/screenshot_042110_170713.jpeg',
        },
        {
          spotId: 8,
          preview: false,
          url: 'https://1.bp.blogspot.com/-Mu7uYUnJ-cg/XS9dcTdKQ5I/AAAAAAAADIA/xARG1hNf_S8k8-eF_qEa3AnoQS1TlUCZQCLcBGAs/s1600/Undercity%2BTrade%2BQuarter.jpg',
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
