import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, useModal } from '../../context/Modal';
import { createAReview, getReviewsBySpotId } from '../../store/review';

import './PostReviewModal.css';

function PostReviewModal({ spotId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [highlightedStars, setHighlightedStars] = useState(0);
  const [reviewDesc, setReviewDesc] = useState('');
  const [reviewDescError, setReviewDescError] = useState('');
  const [starsError, setStarsError] = useState('');

  const updateReviewDesc = (e) => setReviewDesc(e.target.value);

  //Review Stars
  const handleStars = (num) => {
    setHighlightedStars(num);
  };

  const showStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starClass =
        i <= highlightedStars ? 'fa-solid fa-star' : 'fa-regular fa-star';
      stars.push(
        <i key={i} className={starClass} onClick={() => handleStars(i)} />
      );
    }

    return stars;
  };

  //Disbable submit
  const [disabled, setDisabled] = useState(0);

  useEffect(() => {
    if (reviewDesc.length < 10 || highlightedStars < 1) {
      setDisabled(0);
    } else {
      setDisabled(1);
    }
  }, [reviewDesc, highlightedStars]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      review: reviewDesc,
      stars: highlightedStars,
    };

    dispatch(createAReview(payload, spotId)).then(closeModal);
  };

  return (
    <>
      <div className="post-review-form-container">
        <div className="review-container">
          <h1>How was your stay?</h1>
          <form className="postreviewform" onSubmit={handleSubmit}>
            <textarea
              className="review-description-input"
              placeholder="Leave your review here..."
              value={reviewDesc}
              onChange={updateReviewDesc}
            ></textarea>
            <div className="stars">
              {showStars()}
              <span className="stars-text">Stars</span>
            </div>
            <div>
              <button
                type="submit"
                disabled={disabled === 0}
                className={
                  disabled === 0
                    ? 'disabled-submit-review-button'
                    : 'submit-review-button'
                }
              >
                Submit your review
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default PostReviewModal;
