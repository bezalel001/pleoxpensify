import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Style dependencies
 */
import './style.scss';

const NotFound = () => {
  return (
    <div className="not-found">
      <h1 className="not-found__title">Details Page not found</h1>

      <Link to="/" className="not-found__link">
        Go to homepage
      </Link>
    </div>
  );
};

export default NotFound;
