/** @format */

/**
 * External dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import ExpenseListFilters from '../expense-list-filters';
import ExpenseList from '../expense-list';
import getVisibleExpenses from '../../selectors';
import { setTotalNumberOfPages } from '../../state/expenses/actions';
import { LIMIT } from '../../utils/constants';

class ExpensesHome extends Component {
  componentDidUpdate(preveProps) {
    const { expenses, dispatch } = this.props;
    const { totalExpenses } = expenses;

    if (totalExpenses !== preveProps.expenses.totalExpenses) {
      dispatch(setTotalNumberOfPages(Math.ceil(totalExpenses / LIMIT)));
    }
  }

  render() {
    const { expenses } = this.props;
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
  }
}

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
  const expenses = getVisibleExpenses(state.expenses, state.filters);
  return {
    expenses: { ...state.expenses, expenses }
  };
};

export default connect(mapStateToProps)(ExpensesHome);
