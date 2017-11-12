import React from 'react';
import PropTypes from 'prop-types';

const Review = (review) => {
  console.log('indiv review', review);
  return [
    <span>individual review</span>,
    <p> {JSON.stringify(review)} </p>,
  ];
};

const Reviews = ({
  reviews,
  showReviewModal,
}) => {
  console.log('all reviews', reviews);
  return (
    <div>
      <button
        onClick={() => showReviewModal(true)}
      >
    Have you lived here before? Add another review.
      </button>
      <span> {reviews.reviewCount} Reviews </span>
      {reviews.reviews.map(review => (
        Review(review)
      ))}
    </div>
  );
};

Reviews.propTypes = {
  reviews: PropTypes.shape({

  }),
};

Reviews.defaultProps = {
  reviews: [],
};

export default Reviews;
