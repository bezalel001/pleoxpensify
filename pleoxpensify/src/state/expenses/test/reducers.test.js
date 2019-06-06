import expensesReducer from '../reducers';
import { getExpensesInitialState } from '../../initial-state';
import {
  FETCH_EXPENSES_REQUEST,
  FETCH_EXPENSES_FAILURE,
  FETCH_EXPENSES_SUCCESS,
  ADD_COMMENT_TO_EXPENSE_REQUEST,
  ADD_COMMENT_TO_EXPENSE_SUCCESS,
  ADD_COMMENT_TO_EXPENSE_FAILURE,
  ADD_RECEIPT_TO_EXPENSE_FAILURE,
  ADD_RECEIPT_TO_EXPENSE_REQUEST,
  ADD_RECEIPT_TO_EXPENSE_SUCCESS,
  SET_CURRENT_PAGE,
  SET_TOTAL_NUMBER_OF_PAGES
} from '../../action-types';

import { status } from '../../../utils/constants';
import { expenses, expensesState, total } from '../../../utils/fixtures';

describe('expenses reducer', () => {
  it('should set default state values', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(getExpensesInitialState());
  });

  describe('fetch expenses state values', () => {
    it('should set `isLoading` state to `true` when action type is `FETCH_EXPENSES_REQUEST`', () => {
      const state = expensesReducer(undefined, {
        type: FETCH_EXPENSES_REQUEST
      });
      expect(state.isLoading).toBe(true);
    });
    it('should set `error` state  when action type is `FETCH_EXPENSES_FAILURE`', () => {
      const error = 'Could not load expenses';
      const state = expensesReducer(undefined, {
        type: FETCH_EXPENSES_FAILURE,
        errorMessage: error
      });
      expect(state.error).toBe(error);
    });

    it('should set state expenses array when action type is FETCH_EXPENSES_SUCCESS', () => {
      const state = expensesReducer(undefined, {
        type: FETCH_EXPENSES_SUCCESS,
        expenses,
        total
      });
      expect(state.expenses).toBe(expenses);
    });

    it('should set state totalExpenses when action type is FETCH_EXPENSES_SUCCESS', () => {
      const state = expensesReducer(undefined, {
        type: FETCH_EXPENSES_SUCCESS,
        expenses,
        total
      });
      expect(state.totalExpenses).toBe(total);
    });

    it('should set `isLoading` state to `false` when action type is `FETCH_EXPENSES_SUCCESS`', () => {
      const state = expensesReducer(undefined, {
        type: FETCH_EXPENSES_SUCCESS,
        expenses,
        total
      });
      expect(state.isLoading).toBe(false);
    });
  });

  describe('add comment to an expense state value changes', () => {
    const commentError = 'Could not add comment to expense';
    const commentBody = 'Some comment';
    it('should set `saveStatus` state value to `SAVING` when action type is `ADD_COMMENT_TO_EXPENSE_REQUEST`', () => {
      const state = expensesReducer(undefined, {
        type: ADD_COMMENT_TO_EXPENSE_REQUEST
      });
      expect(state.saveStatus).toBe(status.SAVING);
    });
    it('should set `saveStatus` state value to `ERROR` when action type is `ADD_COMMENT_TO_EXPENSE_FAILURE`', () => {
      const state = expensesReducer(undefined, {
        type: ADD_COMMENT_TO_EXPENSE_FAILURE,
        errorMessage: commentError
      });
      expect(state.saveStatus).toBe(status.ERROR);
    });
    it('should set `error` state  when action type is `ADD_COMMENT_TO_EXPENSE_FAILURE`', () => {
      const state = expensesReducer(undefined, {
        type: ADD_COMMENT_TO_EXPENSE_FAILURE,
        errorMessage: commentError
      });
      expect(state.error).toBe(commentError);
    });

    it('should set comment for a given expense object when action type is `ADD_COMMENT_TO_EXPENSE_SUCCESS`', () => {
      const state = expensesReducer(expensesState, {
        type: ADD_COMMENT_TO_EXPENSE_SUCCESS,
        expenseId: expensesState.expenses[1].id,
        comment: commentBody
      });
      expect(state.expenses[1].comment).toBe(commentBody);
    });
    it('should set `saveStatus` state value to `SUCCESS` when action type is `ADD_COMMENT_TO_EXPENSE_SUCCESS`', () => {
      const state = expensesReducer(expensesState, {
        type: ADD_COMMENT_TO_EXPENSE_SUCCESS,
        expenseId: expensesState.expenses[1].id,
        comment: commentBody
      });
      expect(state.saveStatus).toBe(status.SUCCESS);
    });

    it('should not add  comment if id is not found', () => {
      const state = expensesReducer(expensesState, {
        type: ADD_COMMENT_TO_EXPENSE_SUCCESS,
        expenseId: '89q3uyrjejfioe0wei',
        comment: commentBody
      });
      expect(state.expenses).toEqual(expensesState.expenses);
    });
  });

  describe('add receipt to an expense state value changes', () => {
    const receiptError = 'Could not add comment to expense';
    const receiptUrl = '/receipts/5b995dffcc602abb5c700771-2';
    it('should set `saveStatus` state value to `SAVING` when action type is `ADD_RECEIPT_TO_EXPENSE_REQUEST`', () => {
      const state = expensesReducer(undefined, {
        type: ADD_RECEIPT_TO_EXPENSE_REQUEST
      });
      expect(state.saveStatus).toBe(status.SAVING);
    });
    it('should set `saveStatus` state value to `ERROR` when action type is `ADD_RECEIPT_TO_EXPENSE_FAILURE`', () => {
      const state = expensesReducer(undefined, {
        type: ADD_RECEIPT_TO_EXPENSE_FAILURE,
        error: receiptError
      });
      expect(state.saveStatus).toBe(status.ERROR);
    });
    it('should set `error` state  when action type is `ADD_RECEIPT_TO_EXPENSE_FAILURE`', () => {
      const state = expensesReducer(undefined, {
        type: ADD_RECEIPT_TO_EXPENSE_FAILURE,
        error: receiptError
      });
      expect(state.error).toBe(receiptError);
    });

    it('should set receipt for a given expense object when action type is `ADD_RECEIPT_TO_EXPENSE_SUCCESS`', () => {
      const state = expensesReducer(expensesState, {
        type: ADD_RECEIPT_TO_EXPENSE_SUCCESS,
        expenseId: expensesState.expenses[2].id,
        receipt: receiptUrl
      });
      expect(
        state.expenses[2].receipts[state.expenses[2].receipts.length - 1]
      ).toBe(receiptUrl);
    });
    it('should set `saveStatus` state value to `SUCCESS` when action type is `ADD_RECEIPT_TO_EXPENSE_SUCCESS`', () => {
      const state = expensesReducer(expensesState, {
        type: ADD_RECEIPT_TO_EXPENSE_SUCCESS,
        expenseId: expensesState.expenses[2].id,
        receipt: receiptUrl
      });
      expect(state.saveStatus).toBe(status.SUCCESS);
    });

    it('should not add receipt if id is not found', () => {
      const state = expensesReducer(expensesState, {
        type: ADD_COMMENT_TO_EXPENSE_SUCCESS,
        expenseId: '89q3uyrjejfioe0wei384587485',
        receipt: receiptUrl
      });
      expect(state.expenses).toEqual(expensesState.expenses);
    });
  });

  describe('expenses list pages', () => {
    it('should set the current page when action type is `SET_CURRENT_PAGE`', () => {
      const state = expensesReducer(undefined, {
        type: SET_CURRENT_PAGE,
        page: 5
      });
      expect(state.page).toBe(5);
    });

    it('should set the current page when action type is `SET_TOTAL_NUMBER_OF_PAGES`', () => {
      const state = expensesReducer(undefined, {
        type: SET_TOTAL_NUMBER_OF_PAGES,
        totalPages: 20
      });
      expect(state.totalPages).toBe(20);
    });
  });
});
