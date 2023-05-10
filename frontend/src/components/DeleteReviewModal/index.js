// frontend/src/components/LoginFormModal/index.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';

import './DeleteReview.css';

function DeleteReviewModal({ spotId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDeleteSpot = () => {
    dispatch().then(closeModal);
  };

  const handleNoButton = () => {
    closeModal();
  };

  return (
    <>
      <div className="review-delete-form-container">
        <h1>Confirm Delete</h1>
        <h2>Are you sure you want to delete this review?</h2>
        <div className="review-confirm-container">
          <button className="review-buttonboi" onClick={handleDeleteSpot}>
            Yes
          </button>
          <button className="review-buttonboi-no" onClick={handleNoButton}>
            No
          </button>
        </div>
      </div>
    </>
  );
}

export default DeleteReviewModal;
