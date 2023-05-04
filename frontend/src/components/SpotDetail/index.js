import React, { useState, useEffect } from 'react';
import './SpotDetail.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getSpots } from '../../store/spot';
import { useParams } from 'react-router-dom';

function SpotDetail() {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots[spotId]); // populate from Redux store
  console.log(spot);

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  return (
    // <h1>hi</h1>
    <div className="spot-container">
      <h1 className="spot-name">{spot.name}</h1>
      <p className="spot-address">
        {spot.address}, {spot.city}, {spot.state}, {spot.country}
      </p>
      <p className="spot-description">{spot.description}</p>
      <div className="spot-location">
        <p>Latitude: {spot.lat}</p>
        <p>Longitude: {spot.lng}</p>
      </div>
    </div>
  );
}

export default SpotDetail;
