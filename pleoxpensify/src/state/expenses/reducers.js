/** @format */

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
  ADD_COMMENT_TO_EXPENSE_SUCCESS,
  ADD_COMMENT_TO_EXPENSE_REQUEST,
  ADD_RECEIPT_TO_EXPENSE_REQUEST,
  ADD_RECEIPT_TO_EXPENSE_SUCCESS,
  ADD_RECEIPT_TO_EXPENSE_FAILURE
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

    case ADD_COMMENT_TO_EXPENSE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        didInvalidate: false
      };

    case ADD_COMMENT_TO_EXPENSE_SUCCESS: {
      const expenses = state.map(expense => {
        if (expense.id === action.expenseId) {
          return {
            ...expense,
            comment: action.comment
          };
        }
        return expense;
      });
      return {
        ...state,
        expenses: [...expenses],
        isLoading: false,
        error: null,
        didInvalidate: false
      };
    }
    case ADD_COMMENT_TO_EXPENSE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.errorMessage,
        didInvalidate: true
      };

    case ADD_RECEIPT_TO_EXPENSE_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case ADD_RECEIPT_TO_EXPENSE_SUCCESS: {
      const expenses = state.expenses.map(expense => {
        if (expense.id === action.expenseId) {
          return {
            ...expense,
            receipts: [...expense.receipts, action.receipt]
          };
        }
        return expense;
      });
      return {
        ...state,
        expenses: [...expenses],
        isLoading: false,
        error: null,
        didInvalidate: false
      };
    }

    case ADD_RECEIPT_TO_EXPENSE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        didInvalidate: false
      };
    default:
      return state;
  }
};

export default expensesReducer;
