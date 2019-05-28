/** @format */

/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Style dependencies
 */
import './style.scss';

const Pagination = props => {
  const { page, totalPages, onPaginationClick } = props;
  return (
    <div className="pagination">
      <button
        type="button"
        className="pagination__button"
        onClick={() => onPaginationClick('prev')}
        disabled={page <= 1}
      >
        &darr;
      </button>
      <span className="pagination__info">
        Page <b> {page}</b> of <b>{totalPages}</b>
      </span>
      <button
        type="button"
        className="pagination__button"
        onClick={() => onPaginationClick('next')}
        disabled={page >= totalPages}
      >
        &uarr;
      </button>
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPaginationClick: PropTypes.func.isRequired
};

export default Pagination;
