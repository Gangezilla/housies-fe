import { compose, withState } from 'recompose';
import React from 'react';
import { withFormik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import { postInit } from '../util/helpers';

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
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      {formError && <div>Something went wrong when submitting your review. Please try again.</div>}
      {notLoggedIn && <div>Please log in then try again.</div>}
      <label htmlFor="Title">Title</label>
      <Field
        name="title"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.title}
      />
      {touched.title && errors.title && <div>{errors.title}</div>}
      <div>
        <label htmlFor="1" className="">
          <input
            name="rating"
            type="radio"
            value="1"
            checked={values.rating === '1'}
            onChange={handleChange}
          />
          1
        </label>
        <label htmlFor="2" className="">
          <input
            name="rating"
            type="radio"
            value="2"
            checked={values.rating === '2'}
            onChange={handleChange}
          />
          2
        </label>
        <label htmlFor="3" className="">
          <input
            name="rating"
            type="radio"
            value="3"
            checked={values.rating === '3'}
            onChange={handleChange}
          />
          3
        </label>
        <label htmlFor="4" className="">
          <input
            name="rating"
            type="radio"
            value="4"
            checked={values.rating === '4'}
            onChange={handleChange}
          />
          4
        </label>
        <label htmlFor="5" className="">
          <input
            name="rating"
            type="radio"
            value="5"
            checked={values.rating === '5'}
            onChange={handleChange}
          />
          5
        </label>
      </div>
      <label htmlFor="description">Description</label>
      <Field
        name="description"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.description}
      />
      {touched.description && errors.description && <div>{errors.description}</div>}
      <label htmlFor="Tips">Tips/Secrets</label>
      <textarea
        name="tips"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.tips}
      />
      <button type="submit" disabled={isSubmitting}>
    Submit
      </button>
    </Form>
  );
};

const ReviewModal = withFormik({
  validate: (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = 'Required';
    } else if (!values.description) {
      errors.description = 'Required';
    }
    return errors;
  },
  // Submission handler
  handleSubmit: (
    values,
    {
      props,
      setSubmitting,
    },
  ) => {
    setSubmitting(true);
    props.showLoader(true);
    const headers = postInit(JSON.stringify(values));
    fetch('/home/review/', headers)
      .then((res) => {
        props.showLoader(false);
        setSubmitting(false);
        if (res.status === 401) {
          props.showNotLoggedIn(true);
        } else if (res.status !== 200) { // eslint-disable-line 
          props.showFormError(true);
        } else {
          console.log('it worked!');
        }
      })
      .catch((err) => {
        console.log(err);
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
};

ReviewModal.defaultProps = {
  currentHome: null,
};

export default enhance(ReviewModal);

// so we need to submit the form, if something goes wrong, tell them to try again.
// on back end, take the data, insert it into db, and then send back success or failure.
