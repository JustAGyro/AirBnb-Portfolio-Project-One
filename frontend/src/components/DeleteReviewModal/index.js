// frontend/src/components/LoginFormModal/index.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { deleteAReview } from '../../store/review';

import './DeleteReview.css';

function DeleteReviewModal({ reviewId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDeleteReview = () => {
    dispatch(deleteAReview(reviewId)).then(closeModal);
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
          <button className="review-buttonboi" onClick={handleDeleteReview}>
            Yes (Delete Review)
          </button>
          <button className="review-buttonboi-no" onClick={handleNoButton}>
            No (Keep Review)
          </button>
        </div>
      </div>
    </>
  );
}

export default DeleteReviewModal;
