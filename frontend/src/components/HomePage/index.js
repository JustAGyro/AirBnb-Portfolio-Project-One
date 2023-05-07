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

  return (
    <div className="spots-container">
      {spots.map((spot) => (
        <Link to={`/api/spots/${spot.id}`}>
          <div key={spot.id} className="spot-card">
            <img src={spot.previewImage[0][0].url} alt={spot.name} />
            <div className="spot-info">
              <div className="spot-card-location">
                <div className="spot-card-city-state">
                  {spot.city}, {spot.state}
                </div>
              </div>
              <div className="average-rating">
                <i className="fa fa-star"></i>
                <div className="spot-card-stars">
                  {spot.average_rating ? spot.average_rating.toFixed(2) : 'NEW'}
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
