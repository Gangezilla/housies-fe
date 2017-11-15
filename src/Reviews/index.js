import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// reviewId text, //
// homeId text, // 
// title text, 
// description text,
// rating int,
// tips text
// memberId text // 
// firstName
// lastName
// profilePic

const Review = (review) => {
  const ReviewContainer = styled.div`
  `;

  return (
    <ReviewContainer>
      <div>
        <span>{review.title}</span>
        <span>{review.rating}</span>
      </div>
      <div>
        <div>
          <h4>Description</h4>
          <p>{review.description}</p>
        </div>
        <div>
          <h4>Tips</h4>
          <p>{review.tips}</p>
        </div>
        <span>By {review.firstName} {review.lastName}</span>
      </div>
    </ReviewContainer>
  );
};

const ReviewHeading = styled.h3`
`;

const ReviewsContainer = styled.div`
`;

const Reviews = ({
  reviews,
  showReviewModal,
}) => {
  return (
    <div>
      <button
        onClick={() => showReviewModal(true)}
      >
    Have you lived here before? Add another review.
      </button>
      <ReviewHeading> {reviews.reviewCount} Review{reviews.reviewCount > 1 ? 's' : ''} </ReviewHeading>
      <ReviewsContainer>
        {reviews.reviews.map(review => (
          Review(review)
        ))}
      </ReviewsContainer>
    </div>
  );
};

// Big chunky font like Apple News. Striking.

Reviews.propTypes = {
  reviews: PropTypes.shape({

  }),
};

Reviews.defaultProps = {
  reviews: [],
};

export default Reviews;
