import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../Common/Button';
import Subheading from '../Common/Subheading';

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
    display: block;
    font-family: 'Montserrat', sans-serif;
    text-transform: uppercase;
    font-size: 14px;
    margin-bottom: 5px;
  `;

  const ReviewSpan = styled.span`
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
  `;

  const ReviewParagraph = styled.p`
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
  `;

  return (
    <ReviewCard key={review.title}>
      <HeadingContainer>
        <ReviewSpan>{review.title}</ReviewSpan>
        <ReviewSpan>{review.rating}/5</ReviewSpan>
      </HeadingContainer>
      <div>
        <div>
          <ReviewHeader>Description</ReviewHeader>
          <ReviewParagraph>{review.description}</ReviewParagraph>
        </div>
        <div>
          <ReviewHeader>Tips</ReviewHeader>
          <ReviewParagraph>{review.tips}</ReviewParagraph>
        </div>
        <ReviewSpan>{review.firstName} {review.lastName}</ReviewSpan>
      </div>
    </ReviewCard>
  );
};

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
      <Subheading> {reviews.reviewCount} Review{reviews.reviewCount > 1 ? 's' : ''} </Subheading>
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
