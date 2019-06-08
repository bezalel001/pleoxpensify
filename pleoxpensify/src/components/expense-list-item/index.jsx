/** @format */

/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

/**
 * Internal dependencies
 */
import { formatAmount } from '../../utils/functions';

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
      <NavLink
        to={`/expenses/${expense.id}`}
        className="expense-list-item"
        style={{ textDecoration: 'none' }}
        activeClassName="expense-list-item__is-active"
        exact
      >
        <div className="expense-list-item__user">{name}</div>
        <div className="expense-list-item__amount">{formattedAmount}</div>
      </NavLink>
    </div>
  );
};
ExpenseListItem.propTypes = {
  expense: PropTypes.shape({
    user: PropTypes.shape({
      first: PropTypes.string.isRequired,
      last: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired
    }).isRequired,
    amount: PropTypes.shape({
      value: PropTypes.string.isRequired,
      currency: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default ExpenseListItem;
