/** @format */

/**
 * External dependencies
 */
import axios from 'axios';

/**
 * Internal dependencies
 */
import {
  FETCH_EXPENSES_FAILURE,
  FETCH_EXPENSES_REQUEST,
  FETCH_EXPENSES_SUCCESS,
  SET_CURRENT_PAGE,
  SET_TOTAL_NUMBER_OF_PAGES,
  ADD_COMMENT_TO_EXPENSE_FAILURE,
  ADD_COMMENT_TO_EXPENSE_REQUEST,
  ADD_COMMENT_TO_EXPENSE_SUCCESS
} from '../action-types';
import { LIMIT, BASE_URL } from '../../utils/constants';

/**
 * Returns an action object signalling the request to retrieve expenses
 *
 * @return {Object} Action object
 */
export const fetchExpensesRequest = () => {
  return {
    type: FETCH_EXPENSES_REQUEST
  };
};

/**
 * Returns an action object signalling that expenses has been fetched from the api
 *
 * @param  {Array}  expenses Array of expenses object
 * @param  {Number} total    Total number of expenses
 * @return {Object}          Action object
 */
export const fetchExpensesSuccess = (expenses, total) => {
  return {
    type: FETCH_EXPENSES_SUCCESS,
    expenses,
    total
  };
};

/**
 * Returns an action object signalling that expenses objects could NOT be retrieved from the api
 *
 * @param  {String} errorMessage Error Message
 * @return {Object}              Action object
 */
export const fetchExpensesFailure = errorMessage => {
  return {
    type: FETCH_EXPENSES_FAILURE,
    errorMessage
  };
};

/**
 * Returns an action thunk, dispatching progress of a request to retrieve expenses
 * for a page and limit options.
 *
 * @param  {Number}   page   Page Number
 * @param  {Number}   LIMIT  Number of Expenses per page
 * @return {Function}        Action thunk
 */
export const fetchExpenses = ({
  page = 1,
  limit = LIMIT
}) => async dispatch => {
  try {
    dispatch(fetchExpensesRequest);
    const offset = (page - 1) * limit;
    const response = await axios.get(BASE_URL, {
      params: {
        limit,
        offset
      }
    });
    const { expenses, total } = await response.data;

    dispatch(fetchExpensesSuccess(expenses, total));
  } catch (error) {
    dispatch(fetchExpensesFailure(error));
  }
};

/**
 * Returns an action object signalling that the current page has been set
 *
 * @param  {Number} page Current page
 * @return {Object}      Action object
 */
export const setCurrrentPage = page => {
  return {
    type: SET_CURRENT_PAGE,
    page
  };
};

/**
 * Returns an action object signalling that the total number of pages has been set
 *
 * @param  {Number} totalPages Total number of pages
 * @return {Object}            Action object
 */
export const setTotalNumberOfPages = totalPages => {
  return {
    type: SET_TOTAL_NUMBER_OF_PAGES,
    totalPages
  };
};

/**
 * Returns an action object signalling that the request to add comment to expense
 *
 * @param  {Number}  expenseId Expense id
 * @return {Object}            Action object
 */
export const addCommentToExpenseRequest = expenseId => {
  return {
    type: ADD_COMMENT_TO_EXPENSE_REQUEST,
    expenseId
  };
};

/**
 * Returns an action object signalling that comment has been successfully added to expense
 *
 * @param  {Number}  expenseId Expense id
 * @param  {String}  comment   Expense comment
 * @return {Object}            Action object
 */
export const addCommentToExpenseSuccess = (expenseId, comment) => {
  return {
    type: ADD_COMMENT_TO_EXPENSE_SUCCESS,
    expenseId,
    comment
  };
};

/**
 * Returns an action object signalling that comment could not be added to expense
 *
 * @param  {Number}  expenseId Expense id
 * @return {Object}            Action object
 */
export const addCommentToExpenseFailure = (expenseId, errorMessage) => {
  return {
    type: ADD_COMMENT_TO_EXPENSE_REQUEST,
    expenseId,
    errorMessage
  };
};

/**
 * Returns an action thunk, dispatching progress of a request to retrieve expenses
 * for a page and limit options.
 *
 * @param  {Number}   expenseId ExpenseId
 * @param  {String}   comment   Comment to be added
 * @return {Function}           Action thunk
 */
export const addCommentToExpense = (expenseId, comment) => async dispatch => {
  try {
    dispatch(addCommentToExpenseRequest(expenseId));
    const response = await axios.post(`${BASE_URL}/${expenseId}`, comment);
    const data = await response.data;
    dispatch(addCommentToExpenseSuccess(expenseId, data.comment));
  } catch (error) {
    dispatch(addCommentToExpenseFailure(expenseId, error));
  }
};
