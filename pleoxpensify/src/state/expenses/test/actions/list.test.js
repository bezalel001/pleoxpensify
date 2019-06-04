import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
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
import { getExpensesInitialState } from '../../../initial-state';
import { BASE_URL } from '../../../../utils/constants';

describe('List expenses actions', () => {
  let action;
  const expenses = [
    {
      id: '5b995dff2e3cb74644948a66',
      amount: {
        value: '2149.29',
        currency: 'GBP'
      },
      date: '2017-06-21T08:45:09.326Z',
      merchant: 'QUONK',
      receipts: [],
      comment: '',
      category: '',
      user: {
        first: 'Atkins',
        last: 'Blackburn',
        email: 'atkins.blackburn@pleo.io'
      }
    },
    {
      id: '5b995dffdeec40464bd614bf',
      amount: {
        value: '731.92',
        currency: 'EUR'
      },
      date: '2017-05-30T14:12:31.054Z',
      merchant: 'WRAPTURE',
      receipts: [],
      comment: '',
      category: '',
      user: {
        first: 'Barbara',
        last: 'Downs',
        email: 'barbara.downs@pleo.io'
      }
    },
    {
      id: '5b995dffcc602abb5c700771',
      amount: {
        value: '603.42',
        currency: 'EUR'
      },
      date: '2017-06-19T23:01:32.198Z',
      merchant: 'SENMAO',
      receipts: [],
      comment: '',
      category: '',
      user: {
        first: 'Berta',
        last: 'Wise',
        email: 'berta.wise@pleo.io'
      }
    },
    {
      id: '5b995dffb6be4eed170194ad',
      amount: {
        value: '2110.74',
        currency: 'GBP'
      },
      date: '2014-09-16T04:02:29.331Z',
      merchant: 'UPDAT',
      receipts: [],
      comment: '',
      category: '',
      user: {
        first: 'Guadalupe',
        last: 'Bolton',
        email: 'guadalupe.bolton@pleo.io'
      }
    },
    {
      id: '5b995dffb04fa69737b7bc0a',
      amount: {
        value: '2905.02',
        currency: 'GBP'
      },
      date: '2014-04-10T23:16:08.764Z',
      merchant: 'ZORROMOP',
      receipts: [],
      comment: '',
      category: '',
      user: {
        first: 'Irma',
        last: 'Jarvis',
        email: 'irma.jarvis@pleo.io'
      }
    }
  ];
  const total = 168;
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
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const store = mockStore(getExpensesInitialState);
    const data = {
      expenses,
      total
    };
    const error = 'URL does not exist on the server';
    beforeEach(() => {
      moxios.install();
    });
    afterEach(() => {
      moxios.uninstall();
    });

    it('should create FETCH_EXPENSES_SUCCESS action object when fetching expenses has successfully been done', () => {
      moxios.wait(() => {
        moxios.stubRequest(BASE_URL, { status: 200, response: data });
      });

      const expectedActions = [
        fetchExpensesRequest(),
        fetchExpensesSuccess(expenses, total)
      ];

      store.dispatch(fetchExpenses({})).then(() => {
        const actionsCalled = store.getActions();
        expect(actionsCalled).toEqual(expectedActions);
      });
    });

    it(' should create FETCH_EXPENSES_FAILURE action object for failed api calls', () => {
      moxios.wait(() => {
        moxios.stubRequest(`${BASE_URL}/expenses/expenses`, {
          status: 404,
          response: error
        });
      });
      const expectedActions = [
        fetchExpensesRequest(),
        fetchExpensesFailure(error)
      ];
      store.dispatch(fetchExpenses({})).then(() => {
        const actionsCalled = store.getActions();
        expect(actionsCalled).toEqual(expectedActions);
      });
    });
  });
});
