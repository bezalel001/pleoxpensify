import moxios from 'moxios';
import {
  addReceiptToExpense,
  addReceiptToExpenseFailure,
  addReceiptToExpenseRequest,
  addReceiptToExpenseSuccess
} from '../../actions';
import {
  ADD_RECEIPT_TO_EXPENSE_FAILURE,
  ADD_RECEIPT_TO_EXPENSE_REQUEST,
  ADD_RECEIPT_TO_EXPENSE_SUCCESS
} from '../../../action-types';

import { makeMockStore, mockSuccess, mockError } from './helpers';

describe('add receipt to an expense actions', () => {
  let action;
  const receipts = [
    { url: '/receipts/5b996064dfd5b783915112f5-0' },
    { url: '/receipts/5b996064dfd5b783915112f5-1' },
    { url: '/receipts/5b996064dfd5b783915112f5-2' }
  ];
  const expenseId = '5b996064dfd5b783915112f5';
  const error = 'Could not add receipt';
  describe('addReceiptToExpenseRequest action creator', () => {
    beforeEach(() => {
      action = addReceiptToExpenseRequest();
    });
    it('should return the correct action type', () => {
      expect(action.type).toEqual(ADD_RECEIPT_TO_EXPENSE_REQUEST);
    });
  });

  describe('addReceiptToExpenseFailure action creator', () => {
    beforeEach(() => {
      action = addReceiptToExpenseFailure(error);
    });
    it('should return action object with the correct action type', () => {
      expect(action.type).toEqual(ADD_RECEIPT_TO_EXPENSE_FAILURE);
    });
    it('should have the correct payload error message', () => {
      expect(action.error).toEqual(error);
    });
  });

  describe('addReceiptToExpenseSuccess action creator', () => {
    beforeEach(() => {
      action = addReceiptToExpenseSuccess(expenseId, receipts[2]);
    });
    it('should return an action object with the correct type', () => {
      expect(action.type).toEqual(ADD_RECEIPT_TO_EXPENSE_SUCCESS);
    });
    it('should have the correct `id` payload', () => {
      expect(action.expenseId).toEqual(expenseId);
    });
    it('should have the correct `comment` payload', () => {
      expect(action.receipt).toEqual(receipts[2]);
    });
  });

  describe('async `addReceiptToExpense` action creator', () => {
    beforeEach(() => {
      moxios.install();
    });
    afterEach(() => {
      moxios.uninstall();
    });

    it('should dispatch `addReceiptToExpenseRequest` and `addReceiptToExpenseSuccess` with server data on success', async () => {
      const response = { id: expenseId, receipts };
      const store = makeMockStore();

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(mockSuccess(response));
      });

      const expectedActions = [
        addReceiptToExpenseRequest(),
        addReceiptToExpenseSuccess(expenseId, receipts[2])
      ];
      const receipt = new FormData();

      receipt.append('receipt', receipts[2]);

      await store.dispatch(addReceiptToExpense(expenseId, receipt));
      const actualActions = await store.getActions();
      expect(actualActions).toEqual(expectedActions);
    });
    it('should dispatch `addReceiptToExpenseRequest` and `addReceiptToExpenseFailure` with error message', async () => {
      const statusCode = 404;
      const response = `Request failed with status code ${statusCode}`;
      const store = makeMockStore();

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(mockError(statusCode, response));
      });

      const expectedActions = [
        addReceiptToExpenseRequest(),
        addReceiptToExpenseFailure(response)
      ];
      const receipt = new FormData();

      receipt.append('receipt', receipts[2]);

      await store.dispatch(addReceiptToExpense(expenseId, receipt));
      const actualActions = await store.getActions();

      expect(actualActions).toEqual(expectedActions);
    });
  });
});
