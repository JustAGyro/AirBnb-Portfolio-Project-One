import React, { useState, useEffect } from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getSpots } from '../../store/spot';

function HomePage() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => Object.values(state.spots));

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  return (
    <div className="spots-container">
      {spots.map((spot) => (
        <div key={spot.id} className="spot-card">
          <img src="./images/image.jpg" alt={spot.name} />
          <div className="spot-info">
            <div className="spot-card-location">
              <div className="spot-card-city">{spot.city},</div>
              <div className="spot-card-state">{spot.state}</div>
            </div>
            <div className="average-rating">
              <i className="fa fa-star"></i>
              <div className="spot-card-stars">{spot.average_rating}</div>
            </div>
            <div className="spot-card-price">Price: ${spot.price}</div>
          </div>
          <Link to={`/api/spots/${spot.id}`}>
            <h2>{spot.name}</h2>
          </Link>
          <div>{spot.description}</div>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
