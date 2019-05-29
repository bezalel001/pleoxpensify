import moment from 'moment';

const validateFilterTextInput = (expenseProp, filterTextInput) => {
  return expenseProp.toLowerCase().indexOf(filterTextInput.toLowerCase()) >= 0;
};
const validateFilterCurrencyOption = (expenseProp, filterCurrency) => {
  const currencyRegExp = new RegExp(filterCurrency, 'gi');
  return expenseProp.match(currencyRegExp);
};

const validateFilterStartDateOption = (createDate, filterStartDate) => {
  return filterStartDate
    ? filterStartDate.isSameOrBefore(createDate, 'day')
    : true;
};

const validateFilterEndDateOption = (createDate, filterEndDate) => {
  return filterEndDate ? filterEndDate.isSameOrBefore(createDate, 'day') : true;
};

/**
 * `Selector` function which handles client-side filters
 *
 * @param {Object} expensesObject  All Expenses
 * @param {Object} filters         Filters
 * @return {Object}                Visible or Filtered Expenses
 */
const getVisibleExpenses = (expensesObject, filters) => {
  console.log('Expenses filter object', expensesObject);
  let { expenses } = expensesObject;
  if (Array.isArray(expensesObject)) {
    expenses = expensesObject;
  }

  const {
    filterText,
    filterCurrency,
    filterStartDate,
    filterEndDate
  } = filters;
  return expenses.filter(expense => {
    const expenseDate = moment(expense.date);
    const filterStartDateMatch = validateFilterStartDateOption(
      expenseDate,
      filterStartDate
    );
    const filterEndDateMatch = validateFilterEndDateOption(
      expenseDate,
      filterEndDate
    );
    const filterTextInputMatch =
      !filterText ||
      validateFilterTextInput(expense.comment, filterText) ||
      validateFilterTextInput(expense.merchant, filterText) ||
      validateFilterTextInput(expense.user.first, filterText) ||
      validateFilterTextInput(expense.user.last, filterText) ||
      validateFilterTextInput(expense.user.email, filterText);

    const filterCurrencyMatch =
      !filterCurrency ||
      validateFilterCurrencyOption(expense.amount.currency, filterCurrency);

    return (
      filterTextInputMatch &&
      filterCurrencyMatch &&
      filterStartDateMatch &&
      filterEndDateMatch
    );
  });
};

export default getVisibleExpenses;
