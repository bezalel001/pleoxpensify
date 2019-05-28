/** @format */

/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import { formatAmount, formatDate } from '../../utils/functions';

/**
 * Style dependencies
 */
import './style.scss';

const ExpenseDetail = props => {
  const { expense } = props;
  const { user, amount, date, comment, receipts, merchant } = expense;
  const { first, last, email } = user;
  const name = `${first} ${last}`;
  return (
    <div className="expense-detail">
      <div className="expense-detail__merchant">{merchant}</div>
      <div className="expense-detail__amount">{formatAmount(amount)}</div>
      <div className="expense-detail__user">
        <div className="expense-detail__user--name">{name}</div>
        <div className="expense-detail__user--email">{email}</div>
      </div>
      <div className="expense-detail__date">{formatDate(date)}</div>
      <div className="expense-detail__comment">{comment}</div>
      <div className="expense-detail__receipts">
        {receipts &&
          receipts.map((receipt, index) => {
            return (
              <div className="expense-detail__receipts--item" key={receipt.url}>
                <a href={`http://localhost:3000${receipt.url}`}>
                  Receipt-{index}
                </a>
              </div>
            );
          })}
      </div>
    </div>
  );
};
ExpenseDetail.propTypes = {
  user: PropTypes.shape({
    first: PropTypes.string,
    last: PropTypes.string,
    email: PropTypes.string
  }).isRequired,
  amount: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  merchant: PropTypes.string.isRequired,
  comment: PropTypes.string,
  receipts: PropTypes.arrayOf(PropTypes.object)
};

ExpenseDetail.defaultProps = {
  comment: 'No comment',
  receipts: 'No receipts'
};

const mapStateToProps = (state, ownProps) => {
  const { expenses } = state;
  return {
    expense: expenses.expenses.find(
      expense => expense.id === ownProps.match.params.id
    )
  };
};

export default connect(mapStateToProps)(ExpenseDetail);
