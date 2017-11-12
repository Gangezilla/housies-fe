import React from 'react';
import PropTypes from 'prop-types';

const Review = review => (
  <span>individual review</span>
);

const Reviews = reviews => (
  <div>
    <span> Reviews </span>
    {reviews.map(review => (
      Review(review)
    ))}
  </div>
);

Reviews.propTypes = {
  reviews: PropTypes.shape({

  }),
};

Reviews.defaultProps = {
  reviews: [],
};

export default Reviews;
