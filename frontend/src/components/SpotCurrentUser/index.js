import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getCurrentSpots } from '../../store/spot';
import './SpotCurrentUser.css';
import { clearCurrent } from '../../store/spot';
import { deleteASpot } from '../../store/spot';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeleteSpotModal from '../DeleteSpotModal';
import { NavLink } from 'react-router-dom';

function SpotCurrentUser() {
  const dispatch = useDispatch();
  const spotsArray = useSelector((state) =>
    Object.values(state.spots).reverse()
  );
  const owner = useSelector((state) => state.session.user.id);

  useEffect(() => {
    dispatch(getCurrentSpots());
  }, [dispatch]);

  let spots = [];

  for (let i = 0; i < spotsArray.length; i++) {
    let spot = spotsArray[i];
    if (spot.ownerId === owner) {
      spots.push(spot);
    }
  }

  return (
    <div>
      {spots && (
        <div className="current-spots-container">
          <div className="managespots-container">
            <h1>Manage Spots</h1>
            {spots.length === 0 && (
              <NavLink exact to="/spots/new">
                <button className="create-spot-button">
                  Create A New Spot
                </button>
              </NavLink>
            )}
          </div>
          {spots.map((spot) => (
            <div key={spot.id} className="current-spot-card">
              <Link to={`/spots/${spot.id}`} title={spot.name}>
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
                      {spot.average_rating
                        ? spot.average_rating.toFixed(2)
                        : 'NEW'}
                    </div>
                  </div>
                  <div className="current-spot-card-price">
                    ${spot.price} night
                  </div>
                </div>
              </Link>
              <div className="current-spot-card-buttons">
                <Link to={`/spots/${spot.id}/edit`}>
                  <button className="current-spot-card-button">Update</button>
                </Link>
                <button className="current-spot-card-delete-button">
                  <OpenModalMenuItem
                    id="delete-text"
                    itemText="Delete"
                    modalComponent={<DeleteSpotModal spotId={spot.id} />}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SpotCurrentUser;
