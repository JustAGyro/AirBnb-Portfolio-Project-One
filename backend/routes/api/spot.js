const express = require('express');
const {
  Spot,
  User,
  SpotImage,
  Review,
  ReviewImage,
  Booking,
} = require('../../db/models');
const router = express.Router();
const Sequelize = require('sequelize');
const spot = require('../../db/models/spot');

//Get all spots
router.get('/', async (req, res) => {
  const spots = await Spot.findAll({
    attributes: [
      'id',
      'ownerId',
      'address',
      'city',
      'state',
      'country',
      'lat',
      'lng',
      'name',
      'description',
      'price',
      'createdAt',
      'updatedAt',
      [
        Sequelize.fn(
          'COALESCE',
          Sequelize.fn('AVG', Sequelize.col('Reviews.stars')),
          null
        ),
        'average_rating',
      ],
      [
        Sequelize.fn('COALESCE', Sequelize.col('SpotImages.url'), null),
        'preview_image',
      ],
    ],
    include: [
      {
        model: Review,
        attributes: [],
      },
      {
        model: SpotImage,
        attributes: [],
      },
    ],
    group: ['Spot.id', 'SpotImages.url'],
  });

  res.json(spots);
});

//Create a spot
router.post('/', async (req, res) => {
  // const inRoute = 'In Route';
  let { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  const newSpot = await Spot.create({
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
    ownerId: req.user.id,
  });
  res.json(newSpot);
});

//Create an image for a spot
router.post('/:spotId/images', async (req, res) => {
  let { url, preview } = req.body;
  let { spotId } = req.params;

  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    return res.status(404).json({ message: 'Spot not found', status: '404' });
  }

  const newSpotImage = await SpotImage.create({
    url,
    spotId,
    preview,
  });

  res.json(newSpotImage);
});

//Get spots of current user
router.get('/current', async (req, res) => {
  const userId = req.user.id;

  const currentUserSpots = await Spot.findAll({ where: { id: userId } });
  res.json(currentUserSpots);
});

//Get details of a spot by spotId
router.get('/:spotId', async (req, res) => {
  const { spotId } = req.params;

  const findSpot = await Spot.findOne({
    where: { id: spotId },
    include: [{ model: SpotImage }, { model: User, as: 'Owner' }],
  });
  if (!findSpot) {
    return res.status(404).json({ message: 'Spot not found', status: '404' });
  }

  res.json(findSpot);
});

//Edit a spot by spotId
router.put('/:spotId', async (req, res) => {
  const { spotId } = req.params;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    return res.status(404).json({ message: 'Spot not found', status: '404' });
  }

  spot.address = address;
  spot.city = city;
  spot.state = state;
  spot.country = country;
  spot.lat = lat;
  spot.lng = lng;
  spot.name = name;
  spot.description = description;
  spot.price = price;

  await spot.save();

  res.json(spot);
});

//Create a review for a spot
router.post('/:spotId/reviews', async (req, res) => {
  const reviewSpotId = req.params.spotId;
  const { review, stars } = req.body;
  const currentUserId = req.user.id;

  //If spotId doesnt exist -- error
  const spot = await Spot.findByPk(reviewSpotId);
  if (!spot) {
    return res.status(404).json({ message: 'Spot not found', status: '404' });
  }

  //If spotId has a review by the current user -- error
  const findReview = await Review.findOne({
    where: { userId: currentUserId, spotId: reviewSpotId },
  });

  if (findReview) {
    return res.status(403).json({
      message: 'Review for spot already found for this user',
      status: '403',
    });
  }

  const newReview = await Review.create({
    review,
    stars,
    UserId: currentUserId,
    SpotId: reviewSpotId,
  });
  res.json(newReview);
});

//Get all reviews by spotId
router.get('/:spotId/reviews', async (req, res) => {
  const reviewSpotId = req.params.spotId;
  console.log('-------------------debug-------------------');
  console.log(reviewSpotId);
  const findSpot = await Review.findOne({
    where: { SpotId: reviewSpotId },
    include: [{ model: ReviewImage }, { model: User }],
  });

  if (!findSpot) {
    return res.status(404).json({ message: 'Spot not found', status: '404' });
  }
  res.json(findSpot);
});

module.exports = router;
