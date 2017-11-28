import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../Common/Button';

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
  const ReviewCard = styled.div`
    width: 90%;
    max-width: 800px;
    background: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.75);
  `;

  const HeadingContainer = styled.div`
    display: flex;
    justify-content: space-between;
  `;

  const ReviewHeader = styled.h4`
    text-transform: uppercase;
    
  `;

  return (
    <ReviewCard key={review.title}>
      <HeadingContainer>
        <span>{review.title}</span>
        <span>{review.rating}/5</span>
      </HeadingContainer>
      <div>
        <div>
          <ReviewHeader>Description</ReviewHeader>
          <p>{review.description}</p>
        </div>
        <div>
          <ReviewHeader>Tips</ReviewHeader>
          <p>{review.tips}</p>
        </div>
        <span>{review.firstName} {review.lastName}</span>
      </div>
    </ReviewCard>
  );
};

const ReviewHeading = styled.h3`
`;

const ReviewsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: repeating-linear-gradient(
    45deg,
    #fff,
    #fff 10px,
    #7AB8E355 10px,
    #7AB8E355 20px
  );
  margin-top: 15px;
  padding: 15px 0;
`;

const AddReviewButton = Button.extend`
  margin: 0 auto;
`;

const Reviews = ({
  reviews,
  showReviewModal,
}) => {
  return (
    <div>
      <AddReviewButton
        onClick={() => showReviewModal(true)}
      >
    Have you lived here before? Add another review.
      </AddReviewButton>
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
