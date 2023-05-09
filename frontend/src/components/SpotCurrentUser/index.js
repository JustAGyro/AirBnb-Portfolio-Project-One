import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getCurrentSpots } from '../../store/spot';
import './SpotCurrentUser.css';
import { clearCurrent } from '../../store/spot';
import { deleteASpot } from '../../store/spot';

function SpotCurrentUser() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => Object.values(state.spots).reverse());

  useEffect(() => {
    dispatch(getCurrentSpots());

    return () => {
      dispatch(clearCurrent());
    };
  }, [dispatch]);

  const handleDeleteSpot = (spotId) => {
    dispatch(deleteASpot(spotId));
  };

  return (
    <div className="current-spots-container">
      {spots.map((spot) => (
        <div key={spot.id} className="current-spot-card">
          <Link to={`/api/spots/${spot.id}`} title={spot.name}>
            <img
              src={
                spot.preview_image
                  ? spot.preview_image
                  : 'https://media.makeameme.org/created/file-not-found-c17b083c9c.jpg'
              }
            />
            <div className="current-spot-info">
              <div className="current-spot-card-location">
                <div className="current-spot-card-city-state">
                  {spot.city}, {spot.state}
                </div>
              </div>
              <div className="current-average-rating">
                <i id="star-icon" className="fa fa-star"></i>
                <div className="current-spot-card-stars">
                  {spot.average_rating ? spot.average_rating.toFixed(2) : 'NEW'}
                </div>
              </div>
              <div className="current-spot-card-price">${spot.price} night</div>
            </div>
          </Link>
          <div className="current-spot-card-buttons">
            <Link to={`/api/spots/${spot.id}/edit`}>
              <button className="current-spot-card-button">Update</button>
            </Link>
            <button
              className="current-spot-card-button"
              onClick={() => handleDeleteSpot(spot.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SpotCurrentUser;
