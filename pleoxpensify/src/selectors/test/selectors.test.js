import moment from 'moment';
import getVisibleExpenses from '../index';

describe('client-side filters', () => {
  const expenses = {
    expenses: [
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
      },
      {
        id: '5b995dff532e0505c6059b83',
        amount: {
          value: '3950.01',
          currency: 'GBP'
        },
        date: '2015-03-16T16:51:35.666Z',
        merchant: 'POLARAX',
        receipts: [],
        comment: '',
        category: '',
        user: {
          first: 'Wong',
          last: 'Solis',
          email: 'wong.solis@pleo.io'
        }
      },
      {
        id: '5b995dff26b34bf970c0f432',
        amount: {
          value: '3780.84',
          currency: 'EUR'
        },
        date: '2016-01-03T08:29:14.959Z',
        merchant: 'NURPLEX',
        receipts: [],
        comment: '',
        category: '',
        user: {
          first: 'Mitchell',
          last: 'Moody',
          email: 'mitchell.moody@pleo.io'
        }
      },
      {
        id: '5b995dffbb46057fa1ba1d9d',
        amount: {
          value: '2129.48',
          currency: 'EUR'
        },
        date: '2017-02-23T13:02:20.101Z',
        merchant: 'YURTURE',
        receipts: [],
        comment: '',
        category: '',
        user: {
          first: 'Debora',
          last: 'Leach',
          email: 'debora.leach@pleo.io'
        }
      }
    ],
    totalExpenses: 0,
    isLoading: false,
    didInvalidate: false,
    totalPages: 0,
    page: 1,
    error: '',
    refresh: false,
    saveStatus: 'READY'
  };
  it('should filter expenses by text value', () => {
    const filters = {
      filterText: 'b',
      filterCurrency: '',
      filterStartDate: null,
      filterEndDate: null
    };
    const result = getVisibleExpenses(expenses, filters);
    const expected = [
      expenses.expenses[0],
      expenses.expenses[1],
      expenses.expenses[2],
      expenses.expenses[3],
      expenses.expenses[7]
    ];

    expect(result).toEqual(expected);
  });

  it('should filter expenses by currency', () => {
    const filters = {
      filterText: '',
      filterCurrency: 'GBP',
      filterStartDate: null,
      filterEndDate: null
    };
    const result = getVisibleExpenses(expenses, filters);
    const expected = [
      expenses.expenses[0],
      expenses.expenses[3],
      expenses.expenses[4],
      expenses.expenses[5]
    ];

    expect(result).toEqual(expected);
  });

  it('should filter by start date', () => {
    const filters = {
      filterText: '',
      filterCurrency: '',
      filterStartDate: moment('2016-09-16T04:02:29.331Z'),
      filterEndDate: null
    };
    const result = getVisibleExpenses(expenses, filters);
    const expected = [
      expenses.expenses[0],
      expenses.expenses[1],
      expenses.expenses[2],
      expenses.expenses[7]
    ];

    expect(result).toEqual(expected);
  });

  it('should filter by end date', () => {
    const filters = {
      filterText: '',
      filterCurrency: '',
      filterStartDate: null,
      filterEndDate: moment('2016-09-16T04:02:29.331Z')
    };
    const result = getVisibleExpenses(expenses, filters);
    const expected = [
      expenses.expenses[3],
      expenses.expenses[4],
      expenses.expenses[5],
      expenses.expenses[6]
    ];

    expect(result).toEqual(expected);
  });
});
