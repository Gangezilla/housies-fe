import React from 'react';
import { withFormik } from 'formik';

const InnerForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => (
  <form onSubmit={handleSubmit}>
    <label htmlFor="Title">Title</label>
    <input
      type="title"
      name="title"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.title}
    />
    {touched.email && errors.email && <div>{errors.email}</div>}
    <div>
      <label htmlFor="1" className="">1</label>
      <input type="radio" value="1" id="1" className="" />
      <label htmlFor="2" className="">2</label>
      <input type="radio" value="2" id="2" className="" />
      <label htmlFor="3" className="">3</label>
      <input type="radio" value="3" id="3" className="" />
      <label htmlFor="4" className="">4</label>
      <input type="radio" value="4" id="4" className="" />
      <label htmlFor="5" className="">5</label>
      <input type="radio" value="5" id="5" className="" />
    </div>
    <label htmlFor="description">Description</label>
    <input
      type="description"
      name="description"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.description}
    />
    <button type="submit" disabled={isSubmitting}>
    Submit
    </button>
  </form>
);

const ReviewModal = withFormik({
  // Transform outer props into form values
  // mapPropsToValues: props => ({ title: '', description: '' }),
  // Add a custom validation function (this can be async too!)
  validate: (values, props) => {
    const errors = {};
    if (!values.title) {
      errors.title = 'Required';
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
    console.log('cool', values);
  },
})(InnerForm);

export default ReviewModal;
