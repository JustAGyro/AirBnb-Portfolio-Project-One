import React, { useEffect } from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getSpots } from '../../store/spot';

function HomePage() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => Object.values(state.spots).reverse());

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  console.log(spots);
  //Get average rating to not suck -_-
  for (let i = 0; i < spots.length; i++) {
    let spot = spots[i];
    if (spot.average_rating === null) {
      spot.average_rating = 0;
    }
    if (isNaN(spot.average_rating)) {
      spot.average_rating = 0;
    }
    let avgRating = Number(spot.average_rating);
    let cuteAvgRating = avgRating.toFixed(1);
    spot.average_rating = cuteAvgRating;
  }

  return (
    <div className="spots-container">
      {spots.map((spot) => (
        <Link to={`/spots/${spot.id}`} title={spot.name}>
          <div key={spot.id} className="spot-card">
            <img
              src={
                spot.previewImage &&
                spot.previewImage[0][0] &&
                spot.previewImage[0][0].url
                  ? spot.previewImage[0][0].url
                  : 'https://media.makeameme.org/created/file-not-found-c17b083c9c.jpg'
              }
            />
            <div className="spot-info">
              <div className="spot-card-location">
                <div className="spot-card-city-state">
                  {spot.city}, {spot.state}
                </div>
              </div>
              <div className="average-rating">
                <i className="fa fa-star"></i>
                <div className="spot-card-stars">
                  {spot.average_rating == 0.0 ? 'NEW' : spot.average_rating}
                </div>
              </div>
              <div className="spot-card-price">${spot.price} night</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default HomePage;
