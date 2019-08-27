import React from 'react';
import PropTypes from 'prop-types';

let Error = ({ location }) => {
  return <div className="container">
    <h2>{location.pathname}: do not exist or you do not have permission to access it.</h2>
  </div>;
};

Error.propTypes = {
  location: PropTypes.object
};

export default Error;
