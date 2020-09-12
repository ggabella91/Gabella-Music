import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

import './with-spinner.styles.scss';

const withSpinner = ({ isLoading, ...children }) => (
  <div>
    {isLoading ? (
      <Spinner animation='border' role='status'>
        Loading...
      </Spinner>
    ) : (
      { children }
    )}
  </div>
);

export default withSpinner;
