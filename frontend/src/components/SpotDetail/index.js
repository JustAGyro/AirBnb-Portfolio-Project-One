import React, { useState, useEffect } from 'react';
import './SpotDetail.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getReviewsBySpotId } from '../../store/review';
import { clearReviews } from '../../store/review';

function SpotDetail() {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots[spotId]); // populate from Redux store
  console.log(spot);

  useEffect(() => {
    dispatch(getReviewsBySpotId(spotId));

    return () => {
      dispatch(clearReviews());
    };
  }, [dispatch, spotId]);

  const reviews = useSelector((state) => Object.values(state.reviews)); // retrieve reviews from Redux store

  return (
    // <h1>hi</h1>
    <div className="spot-container">
      <h1 className="spot-name">{spot.name}</h1>
      <p className="spot-address">
        {spot.city}, {spot.state}, {spot.country}
      </p>
      <div className="spot-images-container">
        {spot.previewImage && (
          <>
            <div className="images">
              <img
                className="first"
                src={spot.previewImage[0][0].url}
                alt="Spot Preview"
              />
              <div className="images-rest">
                {spot.previewImage[0].slice(1).map((image, index) => (
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
      <div className="spot-description-container">
        <p className="hosted-by">Hosted by Firstname, Lastname</p>
        <p className="spot-description">{spot.description}</p>
      </div>
      <div className="reviews-container">
        <h2>Reviews:</h2>
        {reviews &&
          reviews.map((review) => (
            <div key={review.id} className="review">
              <p>{review.review}</p>
              <p>{review.stars}</p>
              <p>{review.userId}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default SpotDetail;
