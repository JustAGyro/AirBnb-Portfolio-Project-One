// frontend/src/components/LoginFormModal/index.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { deleteASpot } from '../../store/spot';

import './DeleteSpot.css';

function DeleteSpotModal({ spotId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDeleteSpot = () => {
    dispatch(deleteASpot(spotId)).then(closeModal);
  };

  const handleNoButton = () => {
    closeModal();
  };

  return (
    <>
      <div className="delete-form-container">
        <h1>Confirm Delete</h1>
        <h2>Are you sure you want to remove this spot from the listings?</h2>
        <div className="confirm-container">
          <button className="buttonboi" onClick={handleDeleteSpot}>
            Yes
          </button>
          <button className="buttonboi-no" onClick={handleNoButton}>
            No
          </button>
        </div>
      </div>
    </>
  );
}

export default DeleteSpotModal;
