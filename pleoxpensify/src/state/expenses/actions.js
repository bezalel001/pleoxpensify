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
  FETCH_EXPENSES_SUCCESS
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
