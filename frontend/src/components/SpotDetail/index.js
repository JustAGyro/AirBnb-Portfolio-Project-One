import React, { useEffect, useState } from 'react';
import './SpotDetail.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getReviewsBySpotId } from '../../store/review';
import { clearReviews } from '../../store/review';
import { clearOwner, getOwnerBySpotId } from '../../store/owner';
import { getOneSpot, clearCurrent } from '../../store/spot';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import PostReviewModal from '../PostReviewModal';

function SpotDetail() {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const reviewNumber = useSelector((state) => Object.values(state.reviews));

  useEffect(() => {
    dispatch(getReviewsBySpotId(spotId));
    dispatch(getOwnerBySpotId(spotId));
    dispatch(getOneSpot(spotId));
    return () => {
      dispatch(clearReviews());
      dispatch(clearOwner());
      dispatch(clearCurrent());
    };
  }, [dispatch, spotId]);

  const spot = useSelector((state) => state.spots[spotId]); // populate from Redux store
  const reviews = useSelector((state) => Object.values(state.reviews)); // retrieve reviews from Redux store
  const spotOwner = useSelector((state) => Object.values(state.owner));
  const currentUser = useSelector((state) => state.session.user);
  const actualOwner = spotOwner[0];

  let avgRating = 0;
  let sum = 0;

  //Get average rating
  for (let i = 0; i < reviews.length; i++) {
    const review = reviews[i];
    sum = sum + Number(review.stars);
    avgRating = sum / reviews.length;
  }

  let showButton = true;
  let showDelete = false;

  for (let i = 0; i < reviews.length; i++) {
    const checkReview = reviews[i];
    if (currentUser) {
      if (checkReview.userId === currentUser.id) {
        showButton = false;
        showDelete = true;
      }
    }
  }

  return (
    <div className="spot-container">
      {spot && (
        <>
          <h1 className="spot-name">{spot.name}</h1>
          <p className="spot-address">
            {spot.city}, {spot.state}, {spot.country}
          </p>
          <div className="spot-images-container">
            {spot.SpotImages && (
              <>
                <div className="images">
                  <img
                    className="first"
                    src={
                      spot.SpotImages && spot.SpotImages
                        ? spot.SpotImages[0].url
                        : 'https://media.makeameme.org/created/file-not-found-c17b083c9c.jpg'
                    }
                    alt="Spot Preview"
                  />
                  <div className="images-rest">
                    {spot.SpotImages.slice(1).map((image, index) => (
                      <img
                        className="restofimages"
                        key={index}
                        src={image.url}
                        alt="Spot Preview"
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
          <div class="container">
            <div class="Text">
              {actualOwner && (
                <div class="Hosted">
                  <p>
                    Hosted by {actualOwner.firstName} {actualOwner.lastName}
                  </p>
                </div>
              )}
              <div class="Description">
                <p>{spot.description}</p>
              </div>
            </div>
            <div class="Price">
              <div class="price-container">
                <div class="price-ratings-container">
                  <div class="price-display">
                    <p>${spot.price} night</p>
                  </div>
                  <div class="ratings-display">
                    <i className="fa fa-star"></i>
                    {reviews.length > 0
                      ? `${avgRating.toFixed(1)} · ${reviews.length} ${
                          reviews.length === 1 ? 'Review' : 'Reviews'
                        }`
                      : 'NEW'}
                  </div>
                </div>
                <div class="reserve-button">
                  <button
                    className="button-to-reserve"
                    onClick={() => alert('Feature coming soon...')}
                  >
                    Reserve
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="actual-reviews-container">
            <div class="actual-ratings-display">
              <i className="fa fa-star"></i>
              {reviews.length > 0
                ? `${avgRating.toFixed(1)} · ${reviews.length} ${
                    reviews.length === 1 ? 'Review' : 'Reviews'
                  }`
                : 'NEW'}
            </div>
            {currentUser && (
              <>
                {actualOwner && (
                  <>
                    {showButton && currentUser.id !== actualOwner.id ? (
                      <div>
                        <button className="post-reviews-button">
                          <OpenModalMenuItem
                            itemText="Post A Review"
                            modalComponent={
                              <PostReviewModal spotId={spot.id} />
                            }
                          />
                        </button>
                        {reviews.length === 0 ? (
                          <p>Be the first to post a review!</p>
                        ) : (
                          ''
                        )}
                      </div>
                    ) : (
                      ''
                    )}
                  </>
                )}
              </>
            )}
            {reviews &&
              reviews.map((review) => {
                const formattedDate = new Intl.DateTimeFormat('en-US', {
                  year: 'numeric',
                  month: 'long',
                }).format(new Date(review.updatedAt));
                return (
                  <div key={review.id} className="review">
                    {review?.User && <h2>{review.User.firstName}</h2>}
                    <h3>{formattedDate}</h3>
                    <p>{review.review}</p>
                    {showDelete && review.userId === currentUser.id ? (
                      <button>Delete</button>
                    ) : (
                      ''
                    )}
                  </div>
                );
              })}
          </div>
        </>
      )}
    </div>
  );
}

export default SpotDetail;
