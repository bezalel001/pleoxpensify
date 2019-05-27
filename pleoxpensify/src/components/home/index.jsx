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
import ExpenseList from '../expense-list';

const ExpensesHome = props => {
  const { expenses } = props;

  return (
    <div className="expenses-home">
      <ExpenseList expenses={expenses} />
    </div>
  );
};

ExpensesHome.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = state => {
  return {
    expenses: state.expenses
  };
};

export default connect(mapStateToProps)(ExpensesHome);
