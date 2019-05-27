/** @format */

/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import formatAmount from '../../utils/functions';

/**
 * Style dependencies
 */
import './style.scss';

const ExpenseListItem = props => {
  const { expense } = props;
  const { user, amount } = expense;
  const name = `${user.first} ${user.last}`;
  const formattedAmount = formatAmount(amount);
  return (
    <div className="expense-list-item">
      <span className="expense-list-item__user">{name}</span>
      <span className="expense-list-item__amount">{formattedAmount}</span>
    </div>
  );
};
ExpenseListItem.propTypes = {
  user: PropTypes.shape({
    first: PropTypes.string.isRequired,
    last: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  }).isRequired,
  amount: PropTypes.shape({
    value: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired
  }).isRequired
};

export default ExpenseListItem;
