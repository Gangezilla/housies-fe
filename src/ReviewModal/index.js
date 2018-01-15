import { compose, withState } from 'recompose';
import React from 'react';
import { withFormik, Form } from 'formik';
import PropTypes from 'prop-types';
import { postInit } from '../util/helpers';
import Modal from '../Common/Modal';
import Subheading from '../Common/Subheading';
import {
  ModalGuts, Label, FormBlock, FitButton, Address, CloseButton, StyledField, Textarea, StyledError,
} from './components';

const enhance = compose(
  withState('formError', 'showFormError', false),
  withState('notLoggedIn', 'showNotLoggedIn', false),
);

const InnerForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  formError,
  notLoggedIn,
  showReviewModal,
  currentHome,
}) => {
  return (
    <Modal>
      <ModalGuts>
        <CloseButton
          exit
          key="Button"
          onClick={() => showReviewModal(false)}
        >
    X
        </CloseButton>
        <Subheading> Write a review </Subheading>
        <Address>{currentHome && JSON.stringify(currentHome)}</Address>
        <Form onSubmit={handleSubmit} key="Form">
          {formError && <div>Something went wrong when submitting your review. Please try again.</div>}
          {notLoggedIn && <div>Please log in then try again.</div>}
          <FormBlock>
            <Label htmlFor="Title">Title</Label>
            <StyledField
              name="title"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
            />
            {touched.title && errors.title && <StyledError>{errors.title}</StyledError>}
          </FormBlock>
          <FormBlock>
            <Label> Rating </Label>
            <Label htmlFor="1" className="">
              <input
                name="rating"
                type="radio"
                value="1"
                checked={values.rating === '1'}
                onChange={handleChange}
              />
          1
            </Label>
            <Label htmlFor="2" className="">
              <input
                name="rating"
                type="radio"
                value="2"
                checked={values.rating === '2'}
                onChange={handleChange}
              />
          2
            </Label>
            <Label htmlFor="3" className="">
              <input
                name="rating"
                type="radio"
                value="3"
                checked={values.rating === '3'}
                onChange={handleChange}
              />
          3
            </Label>
            <Label htmlFor="4" className="">
              <input
                name="rating"
                type="radio"
                value="4"
                checked={values.rating === '4'}
                onChange={handleChange}
              />
          4
            </Label>
            <Label htmlFor="5" className="">
              <input
                name="rating"
                type="radio"
                value="5"
                checked={values.rating === '5'}
                onChange={handleChange}
              />
          5
            </Label>
            {touched.rating && errors.rating && <StyledError>{errors.rating}</StyledError>}
          </FormBlock>
          <FormBlock>
            <Label htmlFor="description">Description</Label>
            <Textarea
              name="description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
            />
            {touched.description && errors.description && <StyledError>{errors.description}</StyledError>}
          </FormBlock>
          <FormBlock>
            <Label htmlFor="Tips">Tips/Secrets</Label>
            <Textarea
              name="tips"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.tips}
            />
          </FormBlock>
          <FitButton type="submit" disabled={isSubmitting}>
            Submit
          </FitButton>
        </Form>
      </ModalGuts>
    </Modal>
  );
};

const ReviewModal = withFormik({
  validate: (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = 'Required';
    } else if (!values.description) {
      errors.description = 'Required';
    } else if (!values.rating) {
      errors.rating = 'Required';
    }
    return errors;
  },
  handleSubmit: (
    values,
    {
      props,
      setSubmitting,
    },
  ) => {
    setSubmitting(true);
    props.showLoader(true);
    const home = props.currentHome;
    const payload = Object.assign({}, {
      values,
      home,
    });
    const headers = postInit(JSON.stringify(payload));
    fetch('/home/review/', headers)
      .then((res) => {
        props.showLoader(false);
        setSubmitting(false);
        if (res.status === 401) {
          props.createVisibleError('Please log in with Facebook first.');
        } else if (res.status !== 200) { // eslint-disable-line 
          props.showFormError(true);
        } else {
          console.log('it worked!');
        }
      })
      .catch((err) => {
        props.showFormError(true);
        props.showLoader(false);
        setSubmitting(false);
      });
  },
})(InnerForm);

ReviewModal.propTypes = {
  currentHome: PropTypes.shape({

  }),
  showLoader: PropTypes.func.isRequired,
  createVisibleError: PropTypes.func.isRequired,
};

ReviewModal.defaultProps = {
  currentHome: null,
};

export default enhance(ReviewModal);
