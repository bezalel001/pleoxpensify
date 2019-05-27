/** @format */

/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import ExpenseListFilters from '../expense-list-filters';
import ExpenseList from '../expense-list';

const ExpensesHome = props => {
  const { expenses } = props;
  const data = expenses.expenses;

  return (
    <div className="expenses-home">
      <div className="expenses-home__expense-list-filters">
        <ExpenseListFilters />
      </div>
      <div className="expenses-home__expense-list">
        <ExpenseList expenses={data} />
      </div>
    </div>
  );
};

ExpensesHome.propTypes = {
  expenses: PropTypes.shape({
    expenses: PropTypes.arrayOf(PropTypes.object),
    isLoading: PropTypes.bool,
    page: PropTypes.number,
    refresh: PropTypes.bool,
    totalExpenses: PropTypes.number,
    totalPages: PropTypes.number,
    didInvalidate: PropTypes.bool,
    error: PropTypes.string
  }).isRequired
};

const mapStateToProps = state => {
  return {
    expenses: state.expenses
  };
};

export default connect(mapStateToProps)(ExpensesHome);
