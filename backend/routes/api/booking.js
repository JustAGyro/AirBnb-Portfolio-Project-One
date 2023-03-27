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

//Get all bookings of current userId
router.get('/current', async (req, res) => {
  const currentUser = req.user.id;

  const findBookings = await Booking.findAll({
    where: { userId: currentUser },
    include: [
      {
        model: Spot,
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
        include: [{ model: SpotImage }],
      },
    ],
  });
  res.json({ Bookings: findBookings });
});

//Edit a booking based on bookingId
router.put('/:bookingId', async (req, res) => {
  const bookingId = req.params.bookingId;
  const { startDate, endDate } = req.body;
  const booking = await Booking.findByPk(bookingId);
  if (!booking) {
    return res
      .status(404)
      .json({ message: 'Booking not found', statusCode: 404 });
  }
  booking.startDate = startDate;
  booking.endDate = endDate;

  await booking.save();

  res.json(booking);
});

//Delete a booking based on a bookingId
router.delete('/:bookingId', async (req, res) => {
  const inRoute = 'In Route';
  const bookingId = req.params.bookingId;

  const booking = await Booking.findByPk(bookingId);

  if (!booking) {
    // If the spot image is not found, return a 404 response
    return res
      .status(404)
      .json({ message: 'Booking not found', statusCode: 404 });
  }

  await booking.destroy();
  res.json({ message: 'Booking deleted successfully' });
});

module.exports = router;
