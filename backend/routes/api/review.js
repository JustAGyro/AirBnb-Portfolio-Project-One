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

//Get reviews of current user
router.get('/current', async (req, res) => {
  const currentUser = req.user.id;

  const findReviews = await Review.findAll({ where: { UserId: currentUser } });
  res.json(findReviews);
});

//Edit a review
router.put('/:reviewId', async (req, res) => {
  const currentReviewId = req.params.reviewId;
  const { review, stars } = req.body;
  const findReview = await Review.findByPk(currentReviewId);
  if (!findReview) {
    return res.status(404).json({ message: 'Spot not found', status: '404' });
  }

  findReview.review = review;
  findReview.stars = stars;

  await findReview.save();

  res.json(findReview);
});
module.exports = router;
