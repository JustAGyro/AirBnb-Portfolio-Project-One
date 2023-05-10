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
        //Spot 1
        {
          userId: 2,
          spotId: 1,
          review:
            "As a long-time player of World of Warcraft, I couldn't resist staying at The Lion's Pride Inn. The decor is spot-on, and the cozy atmosphere makes it the perfect place to unwind after a long day of battling monsters. I'll definitely be back!",
          stars: 5,
        },
        {
          userId: 3,
          spotId: 1,
          review:
            "I had a great stay at The Lion's Pride Inn. The location is fantastic, right in the heart of Stormwind. The staff was friendly and the room was clean and comfortable. My only complaint was the noise from the nearby street, but that's to be expected in such a central location. Overall, I'd definitely recommend this spot to other World of Warcraft fans.",
          stars: 5,
        },
        //Spot 2
        {
          userId: 1,
          spotId: 2,
          review:
            "The Wyvern's Tail Inn is the perfect spot for any true Horde warrior. The atmosphere is rugged and authentic, with tribal decorations and weapons adorning the walls. The staff was friendly and accommodating, and the food and drinks were top-notch. I'll definitely be back!",
          stars: 5,
        },
        {
          userId: 3,
          spotId: 2,
          review:
            "I had a great stay at The Wyvern's Tail Inn. The location is perfect, right in the heart of Orgrimmar. The decor is rustic and authentic, and the atmosphere is lively and welcoming. The only downside was the noise from the nearby market, but that's to be expected in such a bustling city. Overall, I'd definitely recommend this spot to other World of Warcraft fans.",
          stars: 4,
        },
        //Spot 3
        {
          userId: 2,
          spotId: 3,
          review:
            'The World Tree Retreat is an absolute dream for any Night Elf enthusiast. The treehouse is stunning, with breathtaking views of Darnassus and the surrounding forests. The interior is beautifully decorated with elven art and furnishings, and the atmosphere is incredibly peaceful and relaxing. I would highly recommend this spot for anyone looking for a magical escape.',
          stars: 5,
        },
        {
          userId: 4,
          spotId: 3,
          review:
            'While the location and views from The World Tree Retreat are absolutely stunning, the stay was unfortunately not as pleasant as I had hoped. The treehouse itself was quite small and cramped, and the bathroom facilities were inconveniently located. Additionally, the price seemed a bit steep for the amenities provided. Overall, I was a bit disappointed with my stay.',
          stars: 2,
        },
        //Spot 4
        {
          userId: 3,
          spotId: 4,
          review:
            'The location was great, but the cleanliness of the place left something to be desired. There were cobwebs in the corners and the bathroom was not cleaned thoroughly. Disappointing.',
          stars: 2,
        },
        {
          userId: 5,
          spotId: 4,
          review:
            'Do not stay here! The noise from the nearby tavern was unbearable all night long, making it impossible to get any rest. The owner did not seem to care about the disturbance. Save yourself the trouble and find another place to stay.',
          stars: 1,
        },
        //Spot 5
        {
          userId: 4,
          spotId: 5,
          review:
            "Aye, me hearties! If ye be lookin' for a place to rest yer bones after a long day of plunderin', The Salty Sailor's Rest be the spot for ye! The pirate-themed decor be top-notch, and the grog be flowin' all night long. And the views of the ocean be worth the price of admission alone! I'll definitely be comin' back fer another stay.",
          stars: 5,
        },
        {
          userId: 6,
          spotId: 5,
          review:
            "I recently stayed at The Salty Sailor's Rest and had a great time! The pirate-themed decor was really fun and well done, and the staff were friendly and helpful. The only downside was that the walls were a bit thin, so I could hear some noise from the other rooms. But overall, it was a great experience and I would recommend it to any fellow adventurers looking for a fun and unique place to stay.",
          stars: 4,
        },
        //Spot 6
        {
          userId: 5,
          spotId: 6,
          review:
            "I had the most amazing stay at The Sunfury Sanctum. The palace is absolutely stunning with intricate details and luxurious furnishings. The staff was incredibly friendly and helpful, and the views from the balcony were breathtaking. I felt like a true Blood Elf noble staying there. Can't wait to come back!",
          stars: 5,
        },
        {
          userId: 7,
          spotId: 6,
          review:
            'The Sunfury Sanctum exceeded all my expectations. The attention to detail in the decor is simply stunning, and the amenities were top-notch. I particularly enjoyed the spa and the gourmet restaurant. The location is also unbeatable, right in the heart of Silvermoon. Highly recommend this place to anyone looking for a truly indulgent and unforgettable experience.',
          stars: 4,
        },
        //Spot 7
        {
          userId: 6,
          spotId: 7,
          review:
            'As a Tauren player, I was excited to stay in The Highmountain Hideaway during my travels in Azeroth. While the cabin was cozy and the views of Thunder Bluff were stunning, I was disappointed with the lack of amenities. The furnishings were a bit worn, and the kitchen was poorly equipped for cooking. However, the traditional Tauren decorations were a nice touch, and the peaceful surroundings were a welcome break from the chaos of the world. Overall, it was an average stay.',
          stars: 3,
        },
        {
          userId: 8,
          spotId: 7,
          review:
            "I had a mixed experience at The Highmountain Hideaway. On the one hand, the cabin was in a beautiful location with great views and a peaceful atmosphere. On the other hand, the interior was a bit underwhelming. The decorations were nice, but the furniture was outdated and uncomfortable. Additionally, the lack of Wi-Fi made it difficult to stay connected with my guildmates. However, the price was reasonable and the proximity to Thunder Bluff was convenient. It's a decent option for Tauren enthusiasts, but don't expect luxury accommodations.",
          stars: 3,
        },
        //Spot 8
        {
          userId: 6,
          spotId: 8,
          review:
            "I was extremely disappointed with my stay at The Apothecary's Abode. The apartment was dark and dingy, with a musty smell that was hard to ignore. The walls were covered in creepy decorations and it felt like I was staying in a haunted house. The worst part was the uncomfortable bed that made it nearly impossible to sleep. I would not recommend this place to anyone.",
          stars: 1,
        },
        {
          userId: 7,
          spotId: 8,
          review:
            "I had an amazing stay at The Apothecary's Abode! The Gothic-style apartment was beautifully decorated with unique and spooky items that created a one-of-a-kind ambiance. The host was very friendly and provided excellent service throughout my stay. The bed was comfortable and I slept like a baby. I highly recommend this place to anyone looking for a unique and memorable experience.",
          stars: 5,
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
