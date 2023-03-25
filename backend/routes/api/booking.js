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
    where: { UserId: currentUser },
    include: [{ model: Spot }],
  });
  res.json(findBookings);
});

//Edit a booking based on bookingId
router.put('/:bookingId', async (req, res) => {
  const bookingId = req.params.bookingId;
  const { startDate, endDate } = req.body;
  const booking = await Booking.findByPk(bookingId);
  if (!booking) {
    return res
      .status(404)
      .json({ message: 'Booking not found', status: '404' });
  }
  booking.startDate = startDate;
  booking.endDate = endDate;

  await booking.save();

  res.json(booking);
});

module.exports = router;
