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

//Delete a review image based on a reviewImageId
router.delete('/:reviewImageId', async (req, res) => {
  const inRoute = 'In Route';
  const reviewImageId = req.params.reviewImageId;

  const reviewImage = await ReviewImage.findByPk(reviewImageId);

  if (!reviewImage) {
    // If the spot image is not found, return a 404 response
    return res
      .status(404)
      .json({ message: 'Review image not found', status: '404' });
  }

  await reviewImage.destroy();
  res.json({ message: 'Review image deleted successfully' });
});

module.exports = router;
