// frontend/src/components/LoginFormModal/index.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';

import './DeleteSpot.css';

function DeleteSpotModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="delete-form-container">
        <h1>Confirm Delete</h1>
        <h2>Are you sure you want to remove this spot from the listings?</h2>
      </div>
    </>
  );
}

export default DeleteSpotModal;
