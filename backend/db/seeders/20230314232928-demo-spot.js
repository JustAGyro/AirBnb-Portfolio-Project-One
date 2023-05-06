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
          address: '1234 Elwynn Forest Road',
          city: 'Stormwind',
          state: 'Eastern Kingdoms',
          country: 'Azeroth',
          lat: 34.4881,
          lng: -112.0783,
          name: "The Lion's Pride Inn",
          description:
            "This cozy Inn in the heart of Stormwind will make you feel like a hero after a long day of quests. Decorated with shields, swords, and murals of epic battles, it's the perfect spot for World of Warcraft enthusiasts.",
          price: 100,
        },
        {
          ownerId: 2,
          address: '5678 Durotar Avenue',
          city: 'Orgrimmar',
          state: 'Kalimdor',
          country: 'Azeroth',
          lat: 33.4152,
          lng: -111.8315,
          name: "The Wyvern's Tail Inn",
          description:
            'Come stay in this rustic Orcish inn in the bustling city of Orgrimmar. The walls are adorned with weapons, armor, and tribal decorations that will make you feel like a true Horde warrior. Enjoy a cold brew and some hearty food after a long day of raiding.',
          price: 80,
        },
        {
          ownerId: 3,
          address: '9012 Teldrassil Trail',
          city: 'Darnassus',
          state: 'Kalimdor',
          country: 'Azeroth',
          lat: 33.6831,
          lng: -111.8787,
          name: 'The World Tree Retreat',
          description:
            'Rest and rejuvenate in this serene treehouse located in the heart of the mystical city of Darnassus. Enjoy the stunning views of the city and the tranquil sound of nature. The interior is decorated with elven art and furnishings that will transport you to a magical world.',
          price: 120,
        },
        {
          ownerId: 4,
          address: '3456 Ironforge Way',
          city: 'Ironforge',
          state: 'Eastern Kingdoms',
          country: 'Azeroth',
          lat: 33.749,
          lng: -111.8926,
          name: 'The Bronzebeard Bunker',
          description:
            'This cozy dwarven bunker in the heart of Ironforge is perfect for adventurers seeking a warm and welcoming retreat. The walls are decorated with dwarven art, weapons, and tools, and the fireplace will keep you cozy during chilly nights.',
          price: 90,
        },
        {
          ownerId: 5,
          address: '7890 Stranglethorn Vale Road',
          city: 'Booty Bay',
          state: 'Eastern Kingdoms',
          country: 'Azeroth',
          lat: 33.3784,
          lng: -111.8806,
          name: "The Salty Sailor's Rest",
          description:
            'Come stay in this pirate-themed inn located in the bustling port city of Booty Bay. The walls are adorned with pirate flags, maps, and treasure, and the bar serves rum and ale to quench your thirst. Enjoy the vibrant nightlife and stunning ocean views from your window.',
          price: 110,
        },
        {
          ownerId: 6,
          address: '2345 Silvermoon Blvd',
          city: 'Silvermoon',
          state: 'Eastern Kingdoms',
          country: 'Azeroth',
          lat: 33.4742,
          lng: -111.9661,
          name: 'The Sunfury Sanctum',
          description:
            'Indulge in the luxury of this elegant Blood Elf palace, located in the heart of Silvermoon. The interior is adorned with gold and silver accents, crystal chandeliers, and intricate art pieces that will make you feel like royalty.',
          price: 120,
        },
        {
          ownerId: 7,
          address: '4321 Mulgore Meadows',
          city: 'Thunder Bluff',
          state: 'Kalimdor',
          country: 'Azeroth',
          lat: 33.5936,
          lng: -111.9145,
          name: 'The Highmountain Hideaway',
          description:
            'Immerse yourself in Tauren culture in this cozy cabin nestled in the beautiful plains of Mulgore. Enjoy the stunning views of Thunder Bluff and the peaceful sound of nature. The interior is decorated with traditional Tauren art and furnishings that will transport you to another world.',
          price: 100,
        },
        {
          ownerId: 8,
          address: '8765 Undercity Lane',
          city: 'Undercity',
          state: 'Eastern Kingdoms',
          country: 'Azeroth',
          lat: 33.5328,
          lng: -111.929,
          name: "The Apothecary's Abode",
          description:
            'Stay in the eerie city of Undercity in this unique Gothic-style apartment. The walls are adorned with skulls, potions, and other creepy decorations that will send chills down your spine. Enjoy the dark ambiance and explore the spooky catacombs beneath the city.',
          price: 90,
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
