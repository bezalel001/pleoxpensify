import { moment } from 'moment';
import { status } from '../constants';

export const expenses = [
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
export const total = 168;
export const expensesState = {
  expenses,
  totalExpenses: 0,
  isLoading: false,
  didInvalidate: false,
  totalPages: 0,
  page: 1,
  error: '',
  refresh: false,
  saveStatus: status.READY
};
