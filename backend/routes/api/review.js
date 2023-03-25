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

  const findReviews = await Review.findAll({ where: { userId: currentUser } });
  res.json(findReviews);
});

//Create a review image for a review
router.post('/:reviewId/images', async (req, res) => {
  let { url } = req.body;
  let { reviewId } = req.params;

  const review = await Review.findByPk(reviewId);

  if (!review) {
    return res.status(404).json({ message: 'Review not found', status: '404' });
  }

  const newReviewImage = await ReviewImage.create({
    url,
    reviewId,
  });

  res.json(newReviewImage);
});

//Edit a review
router.put('/:reviewId', async (req, res) => {
  const currentReviewId = req.params.reviewId;
  const { review, stars } = req.body;
  const findReview = await Review.findByPk(currentReviewId);
  if (!findReview) {
    return res.status(404).json({ message: 'Review not found', status: '404' });
  }

  findReview.review = review;
  findReview.stars = stars;

  await findReview.save();

  res.json(findReview);
});

//Delete a review based on a reviewId
router.delete('/:reviewId', async (req, res) => {
  const inRoute = 'In Route';
  const reviewId = req.params.reviewId;

  const review = await Review.findByPk(reviewId);

  if (!review) {
    // If the spot image is not found, return a 404 response
    return res.status(404).json({ message: 'Review not found', status: '404' });
  }

  await review.destroy();
  res.json({ message: 'Review deleted successfully' });
});

module.exports = router;
