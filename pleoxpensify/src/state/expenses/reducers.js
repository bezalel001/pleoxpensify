/** @format */

/**
 * Internal dependencies
 */
import {
  FETCH_EXPENSES_FAILURE,
  FETCH_EXPENSES_REQUEST,
  FETCH_EXPENSES_SUCCESS,
  SET_CURRENT_PAGE,
  SET_TOTAL_NUMBER_OF_PAGES
} from '../action-types';
import { getExpensesInitialState } from '../initial-state';

/**
 * `Reducer` function which handles expense-related actions
 *
 * @param {Object} state  Current State
 * @param {Object} action Expense-related Action
 * @return {Object}       Updated State
 */
const expensesReducer = (state = getExpensesInitialState(), action) => {
  switch (action.type) {
    case FETCH_EXPENSES_REQUEST:
      return {
        ...state,
        isLoading: true,
        didInvalidate: false
      };
    case FETCH_EXPENSES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        didInvalidate: false,
        expenses: action.expenses,
        totalExpenses: action.total
      };
    case FETCH_EXPENSES_FAILURE:
      return {
        ...state,
        isLoading: false,
        didInvalidate: true,
        error: action.errorMessage
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        page: action.page
      };
    case SET_TOTAL_NUMBER_OF_PAGES:
      return {
        ...state,
        totalPages: action.totalPages
      };
    default:
      return state;
  }
};

export default expensesReducer;
