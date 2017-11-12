import React from 'react';
import PropTypes from 'prop-types';

const Error = (error) => {
  return (
    <span>{error}</span>
  );
};

const Errors = ({
  errors,
}) => {
  return (<div>
    Errors
    {errors.map(error => Error(error))}
  </div>
  );
};

Errors.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Errors;
