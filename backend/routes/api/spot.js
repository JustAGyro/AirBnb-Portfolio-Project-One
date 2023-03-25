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
const { Op } = require('sequelize');

//Get all spots
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1; // default to page 1 if not provided
  const size = parseInt(req.query.size) || 10; // default to 10 items per page if not provided
  const offset = (page - 1) * size;
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
    limit: size,
    offset: offset,
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
  const findSpot = await Review.findOne({
    where: { SpotId: reviewSpotId },
    include: [{ model: ReviewImage }, { model: User }],
  });

  if (!findSpot) {
    return res.status(404).json({ message: 'Spot not found', status: '404' });
  }
  res.json(findSpot);
});

//Create a booking used a spotId
router.post('/:spotId/bookings', async (req, res) => {
  const inRoute = 'In Route';
  const spotId = req.params.spotId;
  const { startDate, endDate } = req.body;
  const currentUserId = req.user.id;

  const findSpot = await Spot.findOne({
    where: { id: spotId },
  });

  if (!findSpot) {
    return res.status(404).json({ message: 'Spot not found', status: '404' });
  }

  if (endDate <= startDate) {
    return res
      .status(404)
      .json({ message: 'End date cannot be before start date', status: '400' });
  }

  const conflicts = await Booking.findAll({
    where: {
      spotId,
      [Op.or]: [
        {
          startDate: {
            [Op.lte]: endDate,
          },
          endDate: {
            [Op.gte]: endDate,
          },
        },
        {
          startDate: {
            [Op.lte]: startDate,
          },
          endDate: {
            [Op.gte]: startDate,
          },
        },
        {
          startDate: {
            [Op.gte]: startDate,
          },
          endDate: {
            [Op.lte]: endDate,
          },
        },
      ],
    },
  });

  if (conflicts.length > 0) {
    return res.status(400).json({
      message: 'Booking conflicts with existing bookings',
      status: '400',
    });
  }

  const newBooking = await Booking.create({
    spotId: spotId,
    userId: currentUserId,
    startDate: startDate,
    endDate: endDate,
  });

  res.json(newBooking);
});

//Get all bookings for a spotId
router.get('/:spotId/bookings', async (req, res) => {
  const spotId = req.params.spotId;
  const currentUserId = req.user.id;
  const spot = await Spot.findOne({ where: { id: spotId } });
  //Spot doesnt exist error
  if (!spot) {
    return res.status(404).json({ message: 'Spot not found', status: '404' });
  }
  const isOwner = spot.ownerId === currentUserId;

  let bookings;

  if (isOwner) {
    bookings = await Booking.scope('isOwner').findAll({
      where: { spotId: spotId },
      include: { model: User, attributes: ['id', 'firstName', 'lastName'] },
    });
  }
  if (!isOwner) {
    bookings = await Booking.scope('notOwner').findAll({
      where: { spotId: spotId },
    });
  }
  res.json(bookings);
});

//Delete a spot based on a spotId
router.delete('/:spotId', async (req, res) => {
  const inRoute = 'In Route';
  const deleteSpotId = req.params.spotId;

  const spot = await Spot.findByPk(deleteSpotId);

  if (!spot) {
    // If the spot image is not found, return a 404 response
    return res.status(404).json({ message: 'Spot not found', status: '404' });
  }

  await spot.destroy();
  res.json({ message: 'Spot deleted successfully' });
});

module.exports = router;
