import moxios from 'moxios';
import {
  addCommentToExpenseRequest,
  addCommentToExpenseSuccess,
  addCommentToExpenseFailure,
  addCommentToExpense
} from '../../actions';
import {
  ADD_COMMENT_TO_EXPENSE_FAILURE,
  ADD_COMMENT_TO_EXPENSE_REQUEST,
  ADD_COMMENT_TO_EXPENSE_SUCCESS
} from '../../../action-types';

import { makeMockStore, mockSuccess, mockError } from './helpers';

describe('add comment to an expense actions', () => {
  let action;
  const comment = 'Train tickets for CTO';
  const expenseId = '5b995dffcc602abb5c700771';
  const error = 'Could not add comment';
  describe('addCommentToExpenseRequest action creator', () => {
    beforeEach(() => {
      action = addCommentToExpenseRequest();
    });
    it('should return the correct action type', () => {
      expect(action.type).toEqual(ADD_COMMENT_TO_EXPENSE_REQUEST);
    });
  });

  describe('addCommentToExpenseFailure action creator', () => {
    beforeEach(() => {
      action = addCommentToExpenseFailure(error);
    });
    it('should return action object with the correct action type', () => {
      expect(action.type).toEqual(ADD_COMMENT_TO_EXPENSE_FAILURE);
    });
    it('should have the correct payload error message', () => {
      expect(action.errorMessage).toEqual(error);
    });
  });

  describe('addCommentToExpenseSuccess action creator', () => {
    beforeEach(() => {
      action = addCommentToExpenseSuccess(expenseId, comment);
    });
    it('should return an action object with the correct type', () => {
      expect(action.type).toEqual(ADD_COMMENT_TO_EXPENSE_SUCCESS);
    });
    it('should have the correct `id` payload', () => {
      expect(action.expenseId).toEqual(expenseId);
    });
    it('should have the correct `comment` payload', () => {
      expect(action.comment).toEqual(comment);
    });
  });

  describe('async `addCommentToExpense` action creator', () => {
    beforeEach(() => {
      moxios.install();
    });
    afterEach(() => {
      moxios.uninstall();
    });

    it('should dispatch `addCommentToExpenseRequest` and `addCommentToExpenseSuccess` with server data on success', async () => {
      const response = { id: expenseId, comment };
      const store = makeMockStore();

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(mockSuccess(response));
      });

      const expectedActions = [
        addCommentToExpenseRequest(),
        addCommentToExpenseSuccess(expenseId, comment)
      ];

      await store.dispatch(addCommentToExpense(expenseId, comment));
      const actualActions = await store.getActions();
      expect(actualActions).toEqual(expectedActions);
    });
    it('should dispatch `addCommentToExpenseRequest` and `addCommentToExpenseFailure` with error message', async () => {
      const statusCode = 404;
      const response = `Request failed with status code ${statusCode}`;
      const store = makeMockStore();

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(mockError(statusCode, response));
      });

      const expectedActions = [
        addCommentToExpenseRequest(),
        addCommentToExpenseFailure(response)
      ];

      await store.dispatch(addCommentToExpense(expenseId, comment));
      const actualActions = await store.getActions();

      expect(actualActions).toEqual(expectedActions);
    });
  });
});
