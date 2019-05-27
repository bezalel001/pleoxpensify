const getExpensesInitialState = () => {
  return {
    expenses: [],
    totalExpenses: 0,
    isLoading: false,
    didInvalidate: false,
    totalPages: 0,
    page: 1,
    error: null,
    refresh: false
  };
};
export default getExpensesInitialState;
