/** @format */

/**
 * External dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

/**
 * Internal dependencies
 */
import { formatAmount, formatDate } from '../../utils/functions';
import CommentForm from '../expense-comment';
import {
  addCommentToExpense,
  addReceiptToExpense,
  addReceiptToExpenseFailure,
  addCommentToExpenseFailure
} from '../../state/expenses/actions';
import ReceiptForm from '../expense-receipts';
import { BASE_URL } from '../../utils/constants';
import Loader from '../loader';

/**
 * Style dependencies
 */
import './style.scss';

class ExpenseDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAddingComment: false,
      isUploadingReceipt: false,
      show: true
    };
    this.cancelToken = null;
  }

  componentWillUnmount() {
    if (this.cancelToken) this.cancelToken.cancel();
  }

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
    if (!comment) {
      dispatch(addCommentToExpenseFailure('No comment found'));
      return;
    }
    dispatch(addCommentToExpense(id, comment));
    this.setState({ isAddingComment: false });
  };

  onReceiptSubmit = async fileInput => {
    const hasReceiptProperty = Object.prototype.hasOwnProperty.call(
      fileInput,
      'files'
    );

    if (!hasReceiptProperty) {
      this.toggleUploadReceipt();
      const { dispatch } = this.props;
      dispatch(addReceiptToExpenseFailure('No receipt found'));
      this.setState({ show: true });
      return;
    }
    const { expense, dispatch } = this.props;
    const { id } = expense;
    const receipt = new FormData();

    receipt.append('receipt', fileInput.files[0]);

    this.cancelToken = await dispatch(addReceiptToExpense(id, receipt));
    this.setState({ isUploadingReceipt: false });
  };

  onClose = () => {
    this.setState({ show: false });
  };

  render() {
    const { expense, isLoading, error, saveStatus } = this.props;
    if (expense === undefined) {
      return <Redirect to="/" />;
    }

    const { user, amount, date, comment, receipts, merchant } = expense;
    const name = `${user.first} ${user.last}`;

    const { isAddingComment, isUploadingReceipt, show } = this.state;
    let status = saveStatus;

    if (isLoading) {
      return <Loader />;
    }
    if (!show) {
      status = 'READY';
    }

    //

    return (
      <div className="expense-detail">
        <h2 className="expense-detail__title">Details</h2>

        <div className="expense-detail__description">
          <div className="expense-detail__merchant">
            {merchant.toLowerCase()}
          </div>
          <div className="expense-detail__amount">
            <div className="expense-detail__amount--description">Expenses</div>

            <div className="expense-detail__amount--icon">
              <ion-icon name="remove" />
            </div>
            <div className="expense-detail__amount--value">
              {formatAmount(amount)}
            </div>
          </div>
          {comment && (
            <div className="expense-detail__comment">
              <div className="expense-detail__comment--text">{comment}</div>
            </div>
          )}
          <div className="expense-detail__user">
            <div className="expense-detail__user-name">
              <div className="expense-detail__user-name--icon">
                <ion-icon name="person" />
              </div>
              <div className="expense-detail__user-name--first-last">
                {name}
              </div>
            </div>
            <div className="expense-detail__user-email">
              <div className="expense-detail__user-email--icon">
                <ion-icon name="mail" />
              </div>
              <div className="expense-detail__user-email--address">
                {user.email}
              </div>
            </div>
            <div className="expense-detail__user-date">
              <div className="expense-detail__user-date--icon">
                <ion-icon name="calendar" />
              </div>
              <div className="expense-detail__user-date--format">
                {formatDate(date)}
              </div>
            </div>
          </div>

          <div className="expense-detail__alert">
            {
              {
                SUCCESS: (
                  <Alert variant="success" onClose={this.onClose} dismissible>
                    Saved
                  </Alert>
                ),
                SAVING: (
                  <Alert variant="info" onClose={this.onClose} dismissible>
                    Saving
                  </Alert>
                ),
                ERROR: (
                  <Alert variant="danger" onClose={this.onClose} dismissible>
                    Failed:{error}{' '}
                  </Alert>
                )
              }[status]
            }
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
                  <a href={`${BASE_URL}${receipt.url}`}>
                    <img
                      className=" expense-detail__receipts--item-image"
                      src={`${BASE_URL}${receipt.url}`}
                      alt="receipt"
                    />
                  </a>
                </div>
              );
            })}
          <div className="expense-detail__receipts--item">
            {isUploadingReceipt ? (
              <div className=" expense-detail__receipts--form">
                <ReceiptForm onSubmit={this.onReceiptSubmit} />
              </div>
            ) : (
              <div
                className="expense-detail__receipts--placeholder"
                onMouseOver={this.toggleUploadReceipt}
                onFocus={this.toggleUploadReceipt}
              >
                <div className="expense-detail__receipts--placeholder-content">
                  <ion-icon
                    size="large"
                    name="add"
                    className="receipts-dropzone__content--icon"
                  />
                </div>
              </div>
            )}
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
