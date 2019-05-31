import { status } from '../utils/constants';

export const getExpensesInitialState = () => {
  return {
    expenses: [],
    totalExpenses: 0,
    isLoading: false,
    didInvalidate: false,
    totalPages: 0,
    page: 1,
    error: null,
    refresh: false,
    saveStatus: status.READY
  };
};

export const getFiltersInitialState = () => {
  return {
    filterText: '',
    filterCurrency: '',
    filterStartDate: null,
    filterEndDate: null
  };
};
