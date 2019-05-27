/** @format */

/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import ExpenseListItem from '../expense-list-item';

/**
 * Style dependencies
 */
import './style.scss';

const ExpenseList = props => {
  const { expenses } = props;

  return (
    <div className="expense-list">
      <ul className="expense-list___items">
        {expenses.length > 0 &&
          expenses.map(expense => {
            return (
              <li className="expense-list__items--item" key={expense.id}>
                <ExpenseListItem expense={expense} />
              </li>
            );
          })}
      </ul>
    </div>
  );
};
ExpenseListItem.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object)
};

export default ExpenseList;
