import React from 'react';
import { withFormik, Form, Field } from 'formik';

const InnerForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => {
  return (
    <Form onSubmit={handleSubmit}>
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
      setErrors /* setValues, setStatus, and other goodies */,
    },
  ) => {
    setSubmitting(true);
    props.showLoader(true);
    console.log('cool', values);
  },
})(InnerForm);

export default ReviewModal;

// so we need to submit the form, if something goes wrong, tell them to try again.
// on back end, take the data, insert it into db, and then send back success or failure.
