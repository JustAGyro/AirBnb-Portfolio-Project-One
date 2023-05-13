import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getCurrentSpots } from '../../store/spot';
import './SpotCurrentUser.css';
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

  console.log('-------------debug zone------------');
  console.log('spotsArray: ', spotsArray);
  console.log('owner: ', owner);
  console.log('spots: ', spots);
  console.log('-------------debug zone------------');

  //Get average rating to not suck -_-
  let avgRatings = [];
  for (let i = 0; i < spots.length; i++) {
    let spot = spots[i];
    if (spot.average_rating === null) {
      spot.average_rating = 0;
    }
    let avgRating = Number(spot.average_rating);
    let cuteAvgRating = avgRating.toFixed(1);
    spot.average_rating = cuteAvgRating;
  }
  console.log('fixing avg ratings dangit!!!!!!');
  console.log(avgRatings);
  console.log('fixing avg ratings dangit!!!!!!');

  return (
    <div className="current-spots-container">
      <div className="managespots-container">
        <h1>Manage Spots</h1>
        {spots.length === 0 && (
          <NavLink exact to="/spots/new">
            <button className="create-spot-button">Create A New Spot</button>
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
              {spot.average_rating && (
                <div className="current-average-rating">
                  <i id="star-icon" className="fa fa-star"></i>
                  <div className="current-spot-card-stars">
                    {spot.average_rating == 0.0 ? 'NEW' : spot.average_rating}
                  </div>
                </div>
              )}
              <div className="current-spot-card-price">${spot.price} night</div>
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
  );
}

export default SpotCurrentUser;
