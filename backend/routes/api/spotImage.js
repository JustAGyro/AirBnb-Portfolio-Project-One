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

//Delete a spot image based on a spotImageId
router.delete('/:spotImageId', async (req, res) => {
  const inRoute = 'In Route';
  const spotImageId = req.params.spotImageId;

  const spotImage = await SpotImage.findByPk(spotImageId);

  if (!spotImage) {
    // If the spot image is not found, return a 404 response
    return res
      .status(404)
      .json({ message: 'Spot image not found', status: 404 });
  }

  await spotImage.destroy();
  res.json({ message: 'Spot image deleted successfully' });
});

module.exports = router;
