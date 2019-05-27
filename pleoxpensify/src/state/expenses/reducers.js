/** @format */

/**
 * Internal dependencies
 */
import {
  FETCH_EXPENSES_FAILURE,
  FETCH_EXPENSES_REQUEST,
  FETCH_EXPENSES_SUCCESS
} from '../action-types';
import getExpensesInitialState from '../initial-state';

/**
 * `Reducer` function which handles expense-related actions
 *
 * @param {Object} state - current state
 * @param {Object} action - expense-related action
 * @return {Object} updated state
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
    default:
      return state;
  }
};

export default expensesReducer;
