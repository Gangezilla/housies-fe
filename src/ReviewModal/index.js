import { compose, withState } from 'recompose';
import React from 'react';
import { withFormik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { postInit } from '../util/helpers';
import Button from '../Common/Button';
import Modal from '../Common/Modal';
import Subheading from '../Common/Subheading';

const enhance = compose(
  withState('formError', 'showFormError', false),
  withState('notLoggedIn', 'showNotLoggedIn', false),
);

const ModalGuts = styled.div`
  overflow: auto;
  background: white;
  min-height: 500px;
  padding: 50px;  
  position: relative;
  max-width: 500px;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
  font-size: 14px;
  margin-bottom: 5px;
`;

const FormBlock = styled.div`
  display: block;
  margin: 15px 0;
`;

const FitButton = Button.extend`
  width: 100%;
  margin-top: 50px;
`;

const Address = styled.p`

`;

const CloseButton = Button.extend`
  position: absolute;
  top: 5px;
  right: 5px;
`;

const StyledField = styled(Field)`
  width: 100%;
  padding: 5px;
  border: 1px solid rgb(216, 216, 216);
  font-family: 'Cardo', serif;
  font-size: 14px;
`;

const Textarea = styled.textarea`
  padding: 5px;
  max-width: 100%;
  width: 100%;
  min-width: 100%;
  border: 1px solid rgb(216, 216, 216);
  font-family: 'Cardo', serif;
  font-size: 14px;
`;

const Error = styled.p`
  color: red;
  text-transform: uppercase;
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
`;

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
            {touched.title && errors.title && <Error>{errors.title}</Error>}
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
            {touched.rating && errors.rating && <Error>{errors.rating}</Error>}
          </FormBlock>
          <FormBlock>
            <Label htmlFor="description">Description</Label>
            <Textarea
              name="description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
            />
            {touched.description && errors.description && <Error>{errors.description}</Error>}
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

// so we need to submit the form, if something goes wrong, tell them to try again.
// on back end, take the data, insert it into db, and then send back success or failure.
