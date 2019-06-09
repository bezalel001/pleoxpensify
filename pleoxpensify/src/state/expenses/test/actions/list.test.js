import moxios from 'moxios';

import {
  fetchExpensesRequest,
  fetchExpensesFailure,
  fetchExpensesSuccess,
  fetchExpenses,
  setCurrrentPage,
  setTotalNumberOfPages
} from '../../actions';
import {
  FETCH_EXPENSES_FAILURE,
  FETCH_EXPENSES_REQUEST,
  FETCH_EXPENSES_SUCCESS,
  SET_CURRENT_PAGE,
  SET_TOTAL_NUMBER_OF_PAGES
} from '../../../action-types';
import { expenses, total } from '../../../../utils/fixtures';

import {
  makeMockStore,
  mockSuccess,
  mockError
} from '../../../../utils/fixtures/helpers';

describe('List expenses actions', () => {
  let action;

  describe('set current page action creator of expenses', () => {
    beforeEach(() => {
      action = setCurrrentPage(1);
    });
    it('should have the correct action type', () => {
      expect(action.type).toEqual(SET_CURRENT_PAGE);
    });
    it('should have the correct payload', () => {
      expect(action.page).toBe(1);
    });
  });

  describe('set total number of pages action creator of expenses', () => {
    beforeEach(() => {
      action = setTotalNumberOfPages(100);
    });
    it('should have the correct action type', () => {
      expect(action.type).toEqual(SET_TOTAL_NUMBER_OF_PAGES);
    });
    it('should have the correct payload', () => {
      expect(action.totalPages).toBe(100);
    });
  });

  describe('fetch expenses request action creator', () => {
    it('should have the correct action type', () => {
      action = fetchExpensesRequest();
      expect(action.type).toEqual(FETCH_EXPENSES_REQUEST);
    });
  });
  describe('fetch expenses failure action creator', () => {
    beforeEach(() => {
      action = fetchExpensesFailure('Could not fetch expenses');
    });
    it('should have the correct action type', () => {
      expect(action.type).toEqual(FETCH_EXPENSES_FAILURE);
    });
    it('should have the correct payload', () => {
      expect(action.errorMessage).toEqual('Could not fetch expenses');
    });
  });

  describe('fetch expenses success action creator', () => {
    beforeEach(() => {
      action = fetchExpensesSuccess(expenses, total);
    });
    it('should have the correct action type', () => {
      expect(action.type).toEqual(FETCH_EXPENSES_SUCCESS);
    });
    it('should have the correct payloads', () => {
      expect(action.expenses).toEqual(expenses);
      expect(action.total).toBe(total);
    });
  });
  describe('async fetch expenses action creator', () => {
    beforeEach(() => {
      moxios.install();
    });
    afterEach(() => {
      moxios.uninstall();
    });
    it('should dispatch `fetchExpensesRequest` and `fetchExpensesSuccess` with server data on successs', async () => {
      const response = { expenses, total };
      const store = makeMockStore();

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(mockSuccess(response));
      });

      const expectedActions = [
        fetchExpensesRequest(),
        fetchExpensesSuccess(expenses, total)
      ];

      await store.dispatch(fetchExpenses({}));
      const actualActions = await store.getActions();

      expect(actualActions).toEqual(expectedActions);
    });

    it('should dispatch `fetchExpensesRequest` and `fetchExpensesFailure` with error message', async () => {
      const statusCode = 404;
      const response = `Request failed with status code ${statusCode}`;
      const store = makeMockStore();

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(mockError(statusCode, response));
      });

      const expectedActions = [
        fetchExpensesRequest(),
        fetchExpensesFailure(response)
      ];

      await store.dispatch(fetchExpenses({}));
      const actualActions = await store.getActions();

      expect(actualActions).toEqual(expectedActions);
    });
  });
});
