/** @format */

/**
 * External dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import { formatAmount, formatDate } from '../../utils/functions';
import CommentForm from '../expense-comment';
import {
  addCommentToExpense,
  addReceiptToExpense
} from '../../state/expenses/actions';
import ReceiptForm from '../expense-receipts';

/**
 * Style dependencies
 */
import './style.scss';

class ExpenseDetail extends Component {
  state = {
    isAddingComment: false
  };

  toggleAddComment = () => {
    const { isAddingComment } = this.state;
    return this.setState({ isAddingComment: !isAddingComment });
  };

  onCommentSubmit = commentFormvalue => {
    const { expense, dispatch } = this.props;
    const { id } = expense;
    const comment = commentFormvalue.expenseComment;
    dispatch(addCommentToExpense(id, comment));
    this.setState({ isAddingComment: false });
  };

  onReceiptSubmit = async fileInput => {
    const { expense, dispatch } = this.props;
    const { id } = expense;
    const receipt = new FormData();

    receipt.append('receipt', fileInput.files[0]);

    await dispatch(addReceiptToExpense(id, receipt));
  };

  render() {
    const { expense } = this.props;
    const { user, amount, date, comment, receipts, merchant } = expense;
    const { isAddingComment } = this.state;

    return (
      <div className="expense-detail">
        <div className="expense-detail__merchant">{merchant}</div>
        <div className="expense-detail__amount">{formatAmount(amount)}</div>
        <div className="expense-detail__user">
          <span className="expense-detail__user--first">{user.first}</span>
          <span className="expense-detail__user--first">{user.last}</span>

          <div className="expense-detail__user--email">{user.email}</div>
        </div>
        <div className="expense-detail__date">{formatDate(date)}</div>
        <div className="expense-detail__comment">
          <div className="expense-detail__comment--text">{comment}</div>
          <div
            onClick={this.toggleAddComment}
            onKeyDown={this.toggleAddComment}
            role="button"
            tabIndex={0}
            className="expense-detail__comment--add"
          >
            Add comment
          </div>
          {isAddingComment && (
            <div className="expense-detail__comment--form">
              <CommentForm onSubmit={this.onCommentSubmit} />
              <button
                type="button"
                onClick={() => this.setState({ isAddingComment: false })}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
        <div className="expense-detail__receipts">
          {receipts &&
            receipts.map((receipt, index) => {
              return (
                <div
                  className="expense-detail__receipts--item"
                  key={receipt.url}
                >
                  <a href={`http://localhost:3000${receipt.url}`}>
                    <img
                      src={`http://localhost:3000${receipt.url}`}
                      alt="receipt"
                    />
                  </a>
                </div>
              );
            })}
          <div className="expense-detail__receipts--form">
            <ReceiptForm onSubmit={this.onReceiptSubmit} />
          </div>
        </div>
      </div>
    );
  }
}
ExpenseDetail.propTypes = {
  user: PropTypes.shape({
    first: PropTypes.string.isRequired,
    last: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  }).isRequired,
  amount: PropTypes.shape({
    currency: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
  }).isRequired,
  date: PropTypes.string.isRequired,
  merchant: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  receipts: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = (state, ownProps) => {
  const { expenses } = state;
  const expense = expenses.expenses.find(
    exp => exp.id === ownProps.match.params.id
  );

  return {
    expense
  };
};

export default connect(mapStateToProps)(ExpenseDetail);
