import React, { useState, useEffect } from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';

function HomePage() {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    async function fetchSpots() {
      try {
        const response = await fetch('/api/spots');
        const data = await response.json();
        setSpots(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchSpots();
  }, []);

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
              <div className="spot-card-stars">
                {spot.average_rating.toFixed(1)}
              </div>
            </div>
            <div className="spot-card-price">Price: ${spot.price}</div>
          </div>
          <Link to={`/spots/${spot.id}`}>
            <h2>{spot.name}</h2>
          </Link>
          <div>{spot.description}</div>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
