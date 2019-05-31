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
    isAddingComment: false,
    isUploadingReceipt: false
  };

  toggleAddComment = () => {
    const { isAddingComment } = this.state;
    return this.setState({ isAddingComment: !isAddingComment });
  };

  toggleUploadReceipt = () => {
    const { isUploadingReceipt } = this.state;
    return this.setState({ isUploadingReceipt: !isUploadingReceipt });
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
        <h2 className="expense-detail__title">Details</h2>
        <div className="expense-detail__description">
          <div className="expense-detail__merchant">
            {merchant.toLowerCase()}
          </div>
          <div className="expense-detail__amount">
            <div className="expense-detail__amount--icon">
              <ion-icon name="remove" />
            </div>
            <div className="expense-detail__amount--value">
              {formatAmount(amount)}
            </div>
          </div>
          <div className="expense-detail__comment">
            <div className="expense-detail__comment--text">{comment}</div>
          </div>
          <div className="expense-detail__user">
            <div className="expense-detail__user-name">
              <div className="expense-detail__user-name--icon">
                <ion-icon name="person" />
              </div>
              <div className="expense-detail__user-name--first">
                {user.first}
              </div>
              <div className="expense-detail__user-name--last">{user.last}</div>
            </div>
            <div className="expense-detail__user-email">
              <div className="expense-detail__user-email--icon">
                <ion-icon name="mail" />
              </div>
              <div className="expense-detail__user-email--address">
                {user.email}
              </div>
            </div>
          </div>
          <div className="expense-detail__date">
            <div className="expense-detail__date--icon">
              <ion-icon name="calendar" />
            </div>
            <div className="expense-detail__date--format">
              {formatDate(date)}
            </div>
          </div>

          <div className="expense-detail__comment-form">
            <div
              onClick={this.toggleAddComment}
              onKeyDown={this.toggleAddComment}
              role="button"
              tabIndex={0}
              className="expense-detail__comment--add"
            >
              <div className="expense-detail__comment--add--icon">
                <ion-icon name="create" />
              </div>
              <div className="expense-detail__comment--add--text">Comment</div>
            </div>
            {isAddingComment && (
              <div className="expense-detail__comment--form">
                <CommentForm onSubmit={this.onCommentSubmit} />
              </div>
            )}
          </div>
        </div>
        <div className="expense-detail__receipts">
          {receipts.length > 0 &&
            receipts.map(receipt => {
              return (
                <div
                  className="expense-detail__receipts--item"
                  key={receipt.url}
                >
                  <a href={`http://localhost:3000${receipt.url}`}>
                    <img
                      className=" expense-detail__receipts--item-image"
                      src={`http://localhost:3000${receipt.url}`}
                      alt="receipt"
                    />
                  </a>
                </div>
              );
            })}
          <div className="expense-detail__receipts--item">
            <div className=" expense-detail__receipts--form">
              <ReceiptForm onSubmit={this.onReceiptSubmit} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
ExpenseDetail.propTypes = {
  expense: PropTypes.shape({
    user: PropTypes.shape({
      first: PropTypes.string.isRequired,
      last: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired
    }).isRequired,
    amount: PropTypes.shape({
      currency: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    }).isRequired,
    date: PropTypes.string.isRequired,
    merchant: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    receipts: PropTypes.arrayOf(PropTypes.object).isRequired
  }).isRequired
};

const mapStateToProps = (state, ownProps) => {
  const { expenses } = state;
  const expense = expenses.expenses.find(
    exp => exp.id === ownProps.match.params.id
  );

  return {
    expense,
    isLoading: expenses.isLoading,
    error: expenses.error,
    didInvalidate: expenses.didInvalidate,
    saveStatus: expenses.saveStatus
  };
};

export default connect(mapStateToProps)(ExpenseDetail);
