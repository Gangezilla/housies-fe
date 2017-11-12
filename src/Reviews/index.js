import React from 'react';

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

export default Reviews;
